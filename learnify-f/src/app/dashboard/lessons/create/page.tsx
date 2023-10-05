"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import InputField from '@/components/InputField';
import TextareaField from '@/components/TextareaField';
import CheckboxField from '@/components/CheckboxField';
import SelectField from '@/components/SelectField';

export default function LessonCreatePage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [modules, setModules] = useState([]);
    const router = useRouter();

    const fetchModules = async () => {
        try {
            const response = await axiosInstance.get('/modules/');

            if (response.status === 200) {
                console.log(response.data);
                setLoading(false);
                setModules(response.data);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch modules:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    const [lesson, setLesson] = useState({
        title: '',
        content: '',
        module: '',
        is_published: false,
        video_url: '',
        duration: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLesson((values) => ({ ...values, [name]: value }));
    };

    const addLesson = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/lessons/create/', lesson);

            if (response.status === 201) {
                console.log(response.data);
                setLoading(false);
                router.back(); // Redirect back to the lesson list or desired page.
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to add lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Create Lesson</h1>
                    <p className="text-gray-600">Add new lessons to your modules.</p>
                </div>
                <div>
                    <Link href="/dashboard/lessons/">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-sm">
                            Back to Lessons
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <form onSubmit={addLesson} className="bg-white p-6 rounded-lg shadow-md">
                    <SelectField
                        label="Module"
                        name="module"
                        id="module"
                        value={lesson.module}
                        onChange={handleChange}
                        options={modules.map((module) => ({
                            label: module.title,
                            value: module.id,
                        }))}
                    />

                    <InputField
                        label="Title"
                        name="title"
                        type="text"
                        id="title"
                        value={lesson.title}
                        onChange={handleChange}
                    />

                    <TextareaField
                        label="Content"
                        id="content"
                        name="content"
                        value={lesson.content}
                        onChange={handleChange}
                    />

                    <CheckboxField
                        label="Published"
                        id="is_published"
                        name="is_published"
                        checked={lesson.is_published}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Video URL"
                        name="video_url"
                        type="url"
                        id="video_url"
                        value={lesson.video_url}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Duration (minutes)"
                        name="duration"
                        type="number"
                        id="duration"
                        value={lesson.duration}
                        onChange={handleChange}
                    />

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-pink-600 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Please wait...' : 'Add Lesson'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
