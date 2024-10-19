import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  esbuild: {
    jsx: 'automatic' // Set to "automatic" for React 17+ or "react" for older versions
  },

  manifest: {
    manifest_version: 3,
    name: "LinkedIn AI Writer", // Set the desired extension name
    description: "Generate AI responses for LinkedIn and WhatsApp messages",
    version: "1.0.0",
    icons: {
      "16": "icon/16.png", // Path to icons in the "icon" directory
      "32": "icon/32.png",
      "48": "icon/48.png",
      "96": "icon/96.png",
      "128": "icon/128.png"
    },
    background: {
      service_worker: "content-scripts/background.js" // Correct the path to background.js
    },
    action: {
      default_title: "AI Writer",
      default_popup: "popup.html" // Keep the popup HTML file
    },
    content_scripts: [
      {
        matches: ["*://*.linkedin.com/*"], // Add LinkedIn
        js: ["content-scripts/content.js"], // Points to the JavaScript file generated from TypeScript
        css: [] // You can add your CSS here if needed
      },
      {
        matches: ["*://web.whatsapp.com/*"], // Add WhatsApp
        js: ["content-scripts/content.js"], // Reusing the same content script for WhatsApp
        css: [] // You can add CSS here if needed
      },
      {
        matches: ["*://*.google.com/*"], // Google as in original manifest
        js: ["content-scripts/content.js"], // Points to the compiled JavaScript file
        css: [] // You can add CSS here if needed
      }
    ],
    permissions: [
      "activeTab",
      "scripting"
    ]
  }
});
