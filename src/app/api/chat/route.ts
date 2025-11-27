import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';
import { CHAT_SYSTEM_PROMPT } from '@/lib/constants/prompts';
import { Database } from '@/types/database';
import { SupabaseClient } from '@supabase/supabase-js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { message, conversationId } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Rate limiting check (simple implementation)
        // In production, use Redis or similar

        const supabase: SupabaseClient<Database> = await createClient();

        // Get or create conversation
        let convId = conversationId;
        if (!convId) {
            const { data: { user } } = await supabase.auth.getUser();

            const { data: conv, error } = await supabase
                .from('chat_conversations')
                .insert({
                    user_id: user?.id || null,
                    session_id: user ? null : crypto.randomUUID(),
                    context_type: 'general',
                } as any)
                .select()
                .single() as any;

            if (error) throw error;
            convId = conv.id;
        }

        // Get conversation history (last 10 messages for context)
        const { data: history } = await supabase
            .from('chat_messages')
            .select('role, content')
            .eq('conversation_id', convId)
            .order('created_at', { ascending: true })
            .limit(10) as any;

        // Build messages array
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: 'system', content: CHAT_SYSTEM_PROMPT },
            ...(history || []).map((msg: any) => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
            { role: 'user', content: message },
        ];

        // Call OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages,
            temperature: 0.7,
            max_tokens: 800,
        });

        const reply = completion.choices[0].message.content || 'I apologize, I was unable to generate a response.';

        // Save messages to database
        await supabase.from('chat_messages').insert([
            {
                conversation_id: convId,
                role: 'user',
                content: message,
                tokens_used: completion.usage?.prompt_tokens,
            },
            {
                conversation_id: convId,
                role: 'assistant',
                content: reply,
                tokens_used: completion.usage?.completion_tokens,
                model_used: 'gpt-4-turbo-preview',
            },
        ] as any);

        return NextResponse.json({
            reply,
            conversationId: convId,
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}
