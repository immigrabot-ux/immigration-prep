import { useState, useCallback } from 'react';

interface Toast {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive';
}

export function useToast() {
    const [, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((toast: Toast) => {
        // Simple console log for now - in production, this would show a UI toast
        console.log(`[Toast ${toast.variant || 'default'}]:`, toast.title, toast.description);

        // You can implement actual toast UI later
        setToasts(prev => [...prev, toast]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.slice(1));
        }, 3000);
    }, []);

    return { toast };
}
