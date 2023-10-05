import React from 'react';

export default function InputField({ label, name, type, id, value, onChange, required }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 p-2 w-full border border-gray-300 text-blue-500" // Add "bg-white" class for white background
                required={required}
            />
        </div>
    );
};
