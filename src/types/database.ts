export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string | null;
                    phone: string | null;
                    subscription_tier: 'free' | 'basic' | 'standard' | 'premium';
                    subscription_expires_at: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    full_name?: string | null;
                    phone?: string | null;
                    subscription_tier?: 'free' | 'basic' | 'standard' | 'premium';
                    subscription_expires_at?: string | null;
                };
                Update: {
                    email?: string;
                    full_name?: string | null;
                    phone?: string | null;
                    subscription_tier?: 'free' | 'basic' | 'standard' | 'premium';
                    subscription_expires_at?: string | null;
                };
            };
            form_applications: {
                Row: {
                    id: string;
                    user_id: string;
                    form_type: string;
                    form_package: string | null;
                    status: 'draft' | 'review' | 'completed' | 'downloaded';
                    current_step: number;
                    total_steps: number | null;
                    progress_percentage: number;
                    created_at: string;
                    updated_at: string;
                    completed_at: string | null;
                    payment_id: string | null;
                    metadata: Json;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    form_type: string;
                    form_package?: string | null;
                    status?: 'draft' | 'review' | 'completed' | 'downloaded';
                    current_step?: number;
                    total_steps?: number | null;
                    progress_percentage?: number;
                    payment_id?: string | null;
                    metadata?: Json;
                };
                Update: {
                    form_type?: string;
                    form_package?: string | null;
                    status?: 'draft' | 'review' | 'completed' | 'downloaded';
                    current_step?: number;
                    total_steps?: number | null;
                    progress_percentage?: number;
                    completed_at?: string | null;
                    payment_id?: string | null;
                    metadata?: Json;
                };
            };
            form_answers: {
                Row: {
                    id: string;
                    application_id: string;
                    step_number: number;
                    step_name: string | null;
                    answers: Json;
                    is_valid: boolean;
                    validation_errors: Json;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    application_id: string;
                    step_number: number;
                    step_name?: string | null;
                    answers?: Json;
                    is_valid?: boolean;
                    validation_errors?: Json;
                };
                Update: {
                    step_name?: string | null;
                    answers?: Json;
                    is_valid?: boolean;
                    validation_errors?: Json;
                };
            };
            chat_conversations: {
                Row: {
                    id: string;
                    user_id: string | null;
                    session_id: string | null;
                    context_type: string | null;
                    context_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    session_id?: string | null;
                    context_type?: string | null;
                    context_id?: string | null;
                };
                Update: {
                    context_type?: string | null;
                    context_id?: string | null;
                };
            };
            chat_messages: {
                Row: {
                    id: string;
                    conversation_id: string;
                    role: 'user' | 'assistant' | 'system';
                    content: string;
                    tokens_used: number | null;
                    model_used: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    conversation_id: string;
                    role: 'user' | 'assistant' | 'system';
                    content: string;
                    tokens_used?: number | null;
                    model_used?: string | null;
                };
                Update: {
                    content?: string;
                    tokens_used?: number | null;
                    model_used?: string | null;
                };
            };
            payments: {
                Row: {
                    id: string;
                    user_id: string;
                    stripe_payment_intent_id: string | null;
                    stripe_checkout_session_id: string | null;
                    stripe_customer_id: string | null;
                    amount: number;
                    currency: string;
                    status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
                    product_type: string;
                    product_name: string | null;
                    metadata: Json;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    stripe_payment_intent_id?: string | null;
                    stripe_checkout_session_id?: string | null;
                    stripe_customer_id?: string | null;
                    amount: number;
                    currency?: string;
                    status?: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
                    product_type: string;
                    product_name?: string | null;
                    metadata?: Json;
                };
                Update: {
                    stripe_payment_intent_id?: string | null;
                    stripe_checkout_session_id?: string | null;
                    stripe_customer_id?: string | null;
                    amount?: number;
                    currency?: string;
                    status?: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
                    product_type?: string;
                    product_name?: string | null;
                    metadata?: Json;
                };
            };
            quiz_results: {
                Row: {
                    id: string;
                    user_id: string | null;
                    session_id: string | null;
                    answers: Json;
                    recommended_forms: Json;
                    converted_to_signup: boolean;
                    converted_to_purchase: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    session_id?: string | null;
                    answers: Json;
                    recommended_forms: Json;
                    converted_to_signup?: boolean;
                    converted_to_purchase?: boolean;
                };
                Update: {
                    answers?: Json;
                    recommended_forms?: Json;
                    converted_to_signup?: boolean;
                    converted_to_purchase?: boolean;
                };
            };
            tracked_cases: {
                Row: {
                    id: string;
                    user_id: string;
                    receipt_number: string;
                    form_type: string | null;
                    case_name: string | null;
                    last_status: string | null;
                    last_status_date: string | null;
                    status_history: Json;
                    last_checked_at: string | null;
                    check_frequency: string;
                    notifications_enabled: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    receipt_number: string;
                    form_type?: string | null;
                    case_name?: string | null;
                    last_status?: string | null;
                    last_status_date?: string | null;
                    status_history?: Json;
                    last_checked_at?: string | null;
                    check_frequency?: string;
                    notifications_enabled?: boolean;
                };
                Update: {
                    receipt_number?: string;
                    form_type?: string | null;
                    case_name?: string | null;
                    last_status?: string | null;
                    last_status_date?: string | null;
                    status_history?: Json;
                    last_checked_at?: string | null;
                    check_frequency?: string;
                    notifications_enabled?: boolean;
                };
            };
        };
    };
}
