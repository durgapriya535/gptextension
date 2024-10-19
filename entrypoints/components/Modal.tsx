import React, { useState } from 'react';

interface ModalProps {
  setModalOpen: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setModalOpen }) => {
  const [command, setCommand] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');

  const handleGenerate = () => {
    setGeneratedReply('Thank you for the opportunity! If you have any more questions, feel free to ask.');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50" onClick={handleCloseModal}>
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
    <textarea
      value={command}
      onChange={(e) => setCommand(e.target.value)}
      placeholder="Enter a command..."
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <button onClick={handleGenerate} className="bg-green-500 text-white mt-2 px-4 py-2 rounded hover:bg-green-600">
      Generate
    </button>
    {generatedReply && (
      <div className="mt-4">
        <p className="mb-2">{generatedReply}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => insertReply(generatedReply)}>
          Insert
        </button>
      </div>
    )}
  </div>
</div>

  );
};

// Function to insert reply into LinkedIn message box
function insertReply(reply: string) {
  const messageInput = document.querySelector('div.msg-form__contenteditable') as HTMLElement;
  if (messageInput) {
    messageInput.innerText = reply;
  }
}

export default Modal;
