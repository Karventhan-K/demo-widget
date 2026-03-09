import "@shopify/shopify-api/adapters/node";
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";
import { MemorySessionStorage } from "@shopify/shopify-app-session-storage-memory";

/**
 * Shopify Server Configuration
 * This file handles initialization of the Shopify API.
 * For production, replace MemorySessionStorage with a database like Prisma or Redis.
 */

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY || "YOUR_API_KEY",
    apiSecretKey: process.env.SHOPIFY_API_SECRET || "YOUR_API_SECRET_KEY",
    scopes: ["read_products", "read_themes", "write_themes"], // Scopes needed to manage the widget
    hostName: process.env.HOST || "localhost:3000",
    apiVersion: ApiVersion.Unstable,
    isEmbeddedApp: true,
    sessionStorage: new MemorySessionStorage(),
});

/**
 * App Proxy configuration example
 * Use this to securely allow the widget to call your API from any store.
 */
export const APP_PROXY_PATH = "/apps/chat-widget-api";

export default shopify;
