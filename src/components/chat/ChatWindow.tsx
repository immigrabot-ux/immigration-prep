'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface ChatWindowProps {
    onClose: () => void;
}

const INITIAL_MESSAGE: Message = {
    id: 'initial',
    role: 'assistant',
    content: `Hi! I'm here to help answer questions about USCIS forms and immigration processes.

**I can help with:**
• Explaining what forms are for
• Listing typical document requirements
• Describing general processes
• Answering questions about ImmigrationPrep

**Please note:** I provide general information from public USCIS sources, not legal advice. For guidance specific to your situation, please consult an immigration attorney.

How can I help you today?`,
};

export default function ChatWindow({ onClose }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversationId,
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setConversationId(data.conversationId);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'I apologize, but I encountered an error. Please try again.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
                <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs text-blue-100">General information only</p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-blue-700"
                >
                    <span className="sr-only">Close</span>
                    ×
                </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your question..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                    General information only, not legal advice
                </p>
            </div>
        </div>
    );
}
