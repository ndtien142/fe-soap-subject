// src/components/common/FormInput.jsx
import React from "react";

const FormInput = ({ label, type, name, value, onChange, required, disabled, options }) => {
  console.log(`Rendering ${name}: value=${value}, options=`, options); // Debug
  return (
    <div className="mb-4">
      <label className="block text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value || ""} // Đảm bảo giá trị luôn được kiểm soát
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options && options.length > 0 ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="">Không có tùy chọn</option>
          )}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default FormInput;