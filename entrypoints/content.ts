import React from 'react';
import { createRoot } from 'react-dom/client';
import AIButton from './components/AIButton';
import './../styles/popup.css'; // Import the CSS file (relative to where content.ts is located)

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn AI Reply content script running.');

    // Function to inject the React AI button into the LinkedIn message input
    function injectAIButton() {
      const messageInput = document.querySelector('div.msg-form__contenteditable') as HTMLElement | null;

      if (messageInput) {
        let aiButtonContainer = document.getElementById('ai-button-container') as HTMLElement | null;

        // Create the AI button container if it doesn't exist
        if (!aiButtonContainer) {
          aiButtonContainer = document.createElement('span');
          aiButtonContainer.id = 'ai-button-container';
          aiButtonContainer.style.position = 'absolute';
          aiButtonContainer.style.right = '0px';
          aiButtonContainer.style.bottom = "0px";
          aiButtonContainer.style.display = 'none'; // Initially hidden
          messageInput.parentElement?.appendChild(aiButtonContainer);

          // Render React AIButton component inside the container
          const root = createRoot(aiButtonContainer);
          root.render(React.createElement(AIButton));
        }

        // Show button when input field is focused
        messageInput.addEventListener('focusin', () => {
          aiButtonContainer!.style.display = 'inline'; // Show button when focused
        });

        // Hide button when input field loses focus, but not when clicking on AIButton or its modal
        messageInput.addEventListener('focusout', (event) => {
          const relatedTarget = event.relatedTarget as HTMLElement;
          // Only hide if the focus is not on the AI button or its modal
          if (!relatedTarget || (!relatedTarget.closest('#ai-button-container') && !relatedTarget.closest('.modal'))) {
            aiButtonContainer!.style.display = 'none'; // Hide button when not focused on AI button or modal
          }
        });
      }
    }

    // Observe DOM changes and inject the AI button when the message input is detected
    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector('div.msg-form__contenteditable');
      if (messageInput) {
        injectAIButton(); // Inject AI button once the message input is found
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
