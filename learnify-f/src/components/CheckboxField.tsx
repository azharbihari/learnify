import React from 'react';

export default function CheckboxField({ label, name, id, checked, onChange, required }) {
    return (
        <div className="mb-4 flex items-center">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                className="form-checkbox h-4 w-4 text-blue-500 border border-gray-300 focus:ring-blue-400"
                required={required}
            />
            <label htmlFor={id} className="ml-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
        </div>
    );
};
