import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axios';
import InputField from './InputField';

export default function CourseForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        isPublished: false,
    });


    const [editing, setEditing] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <form className="bg-white p-6 rounded-lg shadow-md">
            <InputField
                label="Title"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />



            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md p-2"
                    rows="4"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="startDate" className="block text-gray-600">Start Date</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-600">End Date</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-600">Published</label>
                <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label htmlFor="isPublished" className="text-gray-700">Publish this course</label>
            </div>
            <div>
                <button
                    type="submit"
                    className={`bg-${editing ? 'green' : 'blue'}-500 hover:bg-${editing ? 'green' : 'blue'}-600 text-white py-2 px-4 rounded-md`}
                >
                    {editing ? 'Update Course' : 'Add Course'}
                </button>
            </div>
        </form>

    );
}

