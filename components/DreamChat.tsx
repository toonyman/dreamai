'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface DreamChatProps {
    dreamDescription: string;
    initialInterpretation: string;
}

export default function DreamChat({ dreamDescription, initialInterpretation }: DreamChatProps) {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage = text.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const historyForApi = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    dreamContext: {
                        dreamDescription,
                        initialInterpretation
                    },
                    chatHistory: historyForApi
                }),
            });

            const data = await response.json();

            if (data.response) {
                setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages(prev => [...prev, { role: 'ai', content: t('common.error') }]);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestedQuestions = [
        t('chat.suggestion1', 'Is this a good omen?'),
        t('chat.suggestion2', 'What should I be careful about?'),
        t('chat.suggestion3', 'Tell me more about the symbols.'),
    ];

    return (
        <div className="glass-mystic rounded-[2rem] p-6 md:p-8 border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-full border border-purple-400/30">
                    <Sparkles className="w-5 h-5 text-purple-200" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">{t('chat.title', 'Dream Oracle Chat')}</h2>
                    <p className="text-sm text-purple-200/60 uppercase tracking-widest">{t('chat.subtitle', 'Ask deeper questions about your dream')}</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="text-center py-10 opacity-60">
                        <Bot className="w-12 h-12 mx-auto mb-3 text-purple-300" />
                        <p className="text-purple-100">{t('chat.empty_state', 'The Oracle is listening. Ask anything about your dream.')}</p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                            max-w-[80%] rounded-2xl p-4 text-sm md:text-base leading-relaxed
                            ${msg.role === 'user'
                                ? 'bg-purple-600/40 text-white rounded-tr-sm border border-purple-500/30'
                                : 'bg-white/10 text-purple-50 rounded-tl-sm border border-white/10'}
                        `}>
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 rounded-2xl p-4 rounded-tl-sm w-16 flex items-center justify-center gap-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedQuestions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => handleSendMessage(q)}
                            className="text-sm py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 transition-colors text-left"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div className="relative">
                <input
                    type="text"
                    autoFocus={false} // Prevent auto-scroll on mount
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                    placeholder={t('chat.placeholder', 'Type your question here...')}
                    className="w-full bg-black/30 border border-purple-500/30 rounded-xl py-4 pl-5 pr-12 text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-400/60 focus:ring-1 focus:ring-purple-400/60 transition-all font-light"
                    disabled={isLoading}
                />
                <button
                    onClick={() => handleSendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400 disabled:opacity-50 disabled:hover:bg-purple-500 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
