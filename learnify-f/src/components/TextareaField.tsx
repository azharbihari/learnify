import React from 'react';

export default function TextareaField({ label, name, id, value, onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <textarea
                rows="4"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 p-2 w-full border border-gray-300 text-blue-500" // Add "bg-white" class for white background
            />
        </div>
    );
};
