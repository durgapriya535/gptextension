// export default defineContentScript({
//   matches: ['*://*.google.com/*'],
//   main() {
//     console.log('Hello content.');
//   },
// });

import React from 'react';
import { createRoot } from 'react-dom/client';
import AIButton from './components/AIButton';

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn AI Reply content script running.');

    // Function to inject the React AI button into the LinkedIn message input
    function injectAIButton() {
      const messageInput = document.querySelector('div.msg-form__contenteditable') as HTMLElement | null;

      if (messageInput && !document.querySelector('#ai-button-container')) {
        // Create container for React button
        const aiButtonContainer = document.createElement('span');
        aiButtonContainer.id = 'ai-button-container';
        aiButtonContainer.style.position = 'absolute';
        aiButtonContainer.style.right = '0px';
        aiButtonContainer.style.bottom = "0px";
        messageInput.parentElement?.appendChild(aiButtonContainer);

        // Render React AIButton component inside the container using React.createElement instead of JSX
        const root = createRoot(aiButtonContainer);
        root.render(React.createElement(AIButton)); // No JSX, using React.createElement
      }
    }

    // Observe DOM changes and inject the AI button when the message input is detected
    const observer = new MutationObserver(() => {
      injectAIButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
