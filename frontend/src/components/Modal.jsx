import React from "react";

const Modal = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-4">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
