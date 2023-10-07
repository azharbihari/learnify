"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import TextareaField from '@/components/TextareaField';
import CheckboxField from '@/components/CheckboxField';
import SelectField from '@/components/SelectField';
import { Editor } from '@tinymce/tinymce-react';

export default function LessonEditPage({ params }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [modules, setModules] = useState([]);
    const router = useRouter();
    const { id } = params;

    const fetchLesson = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/lessons/${id}/`);

            if (response.status === 200) {
                setLesson(response.data);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchModules = async () => {
        try {
            const response = await axiosInstance.get('/modules/');

            if (response.status === 200) {
                console.log(response.data);
                setLoading(false);
                setModules(response.data);
            } else {
                throw Error('Network response was not ok');
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
        fetchLesson();
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
        const { name, value, type, checked } = e.target;
        setLesson((values) => ({ ...values, [name]: type === 'checkbox' ? checked : value }));

    };

    const editLesson = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/lessons/${id}/update/`, lesson);

            if (response.status === 200) {
                console.log(response.data);
                setLoading(false);
                router.back(); // Redirect back to the lesson list or desired page.
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to update lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Edit Lesson</h1>
                    <p className="text-gray-600">Modify your lesson details.</p>
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
                <form onSubmit={editLesson} className="bg-white p-6 rounded-lg shadow-md">
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


                    <CheckboxField
                        label="Publish this lesson"
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

                    <Editor
                        apiKey="1q8smyaegq5p6dz4obllk652frzcv1iq4he2u6gexq2huoav"
                        textareaName="content"
                        value={lesson.content}
                        initialValue={lesson.content}
                        onEditorChange={(content) => setLesson({ ...lesson, content })}
                        init={{
                            a11y_advanced_options: true,
                            file_picker_types: 'image',
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | image | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <div className="flex items-center justify-between mt-2">
                        <button
                            className="bg-pink-600 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Please wait...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
