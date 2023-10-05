import React from 'react';

export default function SelectField({ label, name, id, value, onChange, options }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 p-2 w-full border border-gray-300 text-blue-500"
            >
                <option value="" disabled>Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
