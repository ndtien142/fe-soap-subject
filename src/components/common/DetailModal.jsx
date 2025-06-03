// src/components/common/DetailModal.jsx
import React from "react";

const DetailModal = ({ isOpen, onClose, item, fields, title }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-2">
          {fields.map((field) => (
            <p key={field.name}>
              <strong>{field.label}:</strong> {item[field.name] || "N/A"}
            </p>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;