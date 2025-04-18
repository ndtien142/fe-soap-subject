// src/components/common/EditFormModal.jsx
import React from "react";
import FormInput from "./FormInput";

const EditFormModal = ({ isOpen, onClose, onSubmit, fields, title, selectedItem, setSelectedItem }) => {
  if (!isOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={selectedItem[field.name] || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, [field.name]: e.target.value })
              }
              required={field.required}
              disabled={field.disabled}
            />
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFormModal;