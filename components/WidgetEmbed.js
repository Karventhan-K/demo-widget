import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatWidget from './ChatWidget';

/**
 * Agenty Chat Widget Embed Loader
 * This script will:
 * 1. Find its own source URL to know where to load styles from.
 * 2. Inject the CSS into the host page.
 * 3. Render the React component into a root container.
 */

const initializeWidget = () => {
    // 1. Identify where we are being loaded from to fetch styles
    const scripts = document.getElementsByTagName('script');
    const myScript = Array.from(scripts).find(s => s.src.includes('chat-widget.js'));
    const baseUrl = myScript ? myScript.src.replace('chat-widget.js', '') : '';

    // 2. Inject the CSS if it's not already there
    const styleId = 'agenty-chat-widget-styles';
    if (!document.getElementById(styleId)) {
        const link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = `${baseUrl}chat-widget.css`;
        document.head.appendChild(link);
    }

    // 3. Create a isolated container for the widget to prevent host styles from leaking in
    const WIDGET_ID = 'agenty-chat-widget-root';
    let container = document.getElementById(WIDGET_ID);

    if (!container) {
        container = document.createElement('div');
        container.id = WIDGET_ID;
        document.body.appendChild(container);
    }

    // 4. Render the widget
    const root = createRoot(container);
    root.render(<ChatWidget />);

    console.log('🚀 Agenty Chat Widget Successfully Initialized');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
    initializeWidget();
}
