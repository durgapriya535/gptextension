import React from 'react';
import { createRoot } from 'react-dom/client';
import AIButton from './components/AIButton';
import './../styles/popup.css'; 

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn AI Reply content script running.');

    function injectAIButton() {
      const messageInput = document.querySelector('div.msg-form__contenteditable') as HTMLElement | null;

      if (messageInput) {
        let aiButtonContainer = document.getElementById('ai-button-container') as HTMLElement | null;

        if (!aiButtonContainer) {
          aiButtonContainer = document.createElement('span');
          aiButtonContainer.id = 'ai-button-container';
          aiButtonContainer.style.position = 'absolute';
          aiButtonContainer.style.right = '0px';
          aiButtonContainer.style.bottom = "0px";
          aiButtonContainer.style.display = 'none'; 
          messageInput.parentElement?.appendChild(aiButtonContainer);

          const root = createRoot(aiButtonContainer);
          root.render(React.createElement(AIButton));
        }

        messageInput.addEventListener('focusin', () => {
          aiButtonContainer!.style.display = 'inline'; 
        });

        messageInput.addEventListener('focusout', (event) => {
          const relatedTarget = event.relatedTarget as HTMLElement;
          if (!relatedTarget || (!relatedTarget.closest('#ai-button-container') && !relatedTarget.closest('.modal'))) {
            aiButtonContainer!.style.display = 'none'; 
          }
        });
      }
    }

    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector('div.msg-form__contenteditable');
      if (messageInput) {
        injectAIButton(); 
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
