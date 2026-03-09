import { NextResponse } from 'next/server';
import shopify from '../../../shopify.server';

/**
 * Chat Bot API Handler (App Proxy Root)
 * This handles requests sent from the ChatWidget.js in a Shopify store via /apps/chat-widget-api.
 */
export async function POST(req) {
    try {
        const body = await req.json();
        const { message } = body;

        // 1. Authenticate the request via App Proxy signature (Shopify validation should happen here)
        // For demo purposes, we process it as a generic request.

        // 2. Here you can integrate with your AI or backend logic
        const botResponse = `I received your message: "${message}". I am correctly operating via your Shopify App Proxy! 🚀`;

        return NextResponse.json({
            sender: 'bot',
            text: botResponse,
            time: new Date()
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
    }
}

/**
 * Handle GET requests for testing the proxy availability
 */
export async function GET() {
    return NextResponse.json({ status: 'Chat API is alive and waiting for Shopify App Proxy' });
}
