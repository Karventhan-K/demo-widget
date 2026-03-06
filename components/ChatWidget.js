"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatWidget.module.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 How can I help you today?", sender: 'bot', time: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            time: new Date()
        };

        setMessages([...messages, newUserMessage]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: "Thanks for your message! I'm just a demo widget, but I can be connected to any backend or AI model like Gemini. 🤖✨",
                sender: 'bot',
                time: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <div className={styles.widgetContainer}>
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <div className={styles.headerAvatar}>A</div>
                        <div className={styles.headerInfo}>
                            <h3 className={styles.headerTitle}>Agenty Helper</h3>
                            <div className={styles.headerStatus}>
                                <span className={styles.statusDot}></span>
                                Online
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
                            aria-label="Close chat"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className={styles.messageArea} ref={scrollRef}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.botMessage}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form className={styles.inputArea} onSubmit={handleSend}>
                        <input
                            type="text"
                            className={styles.textInput}
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" className={styles.sendButton} aria-label="Send message">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            <button
                className={`${styles.chatLauncher} ${isOpen ? styles.active : ''}`}
                onClick={toggleChat}
                aria-label="Toggle chat widget"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
