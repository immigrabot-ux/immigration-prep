'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-4 z-50 w-96 h-[500px] shadow-2xl rounded-lg overflow-hidden">
                    <ChatWindow onClose={() => setIsOpen(false)} />
                </div>
            )}

            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full shadow-lg"
                size="icon"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6" />
                )}
            </Button>
        </>
    );
}
