// src/components/common/FormInput.jsx
import React from "react";

const FormInput = ({ label, type, name, value, onChange, required, disabled }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-1"
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;