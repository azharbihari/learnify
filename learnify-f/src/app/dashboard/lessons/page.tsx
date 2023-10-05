"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';

export default function LessonPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lessons, setLessons] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/lessons');

            if (response.status === 200) {
                setLessons(response.data);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteLesson = async (lesson) => {
        const confirmDelete = confirm('Are you sure you want to delete this lesson?');
        if (confirmDelete) {
            try {
                const response = await axiosInstance.delete(`/lessons/${lesson.id}/delete/`);

                if (response.status === 204) {
                    console.log(response.data);
                    setLessons((lessons) => lessons.filter((l) => l.id !== lesson.id));
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error deleting lesson:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Lesson Management</h1>
                        <p className="text-gray-600">Explore and manage lessons from all your courses in one place.</p>
                    </div>
                    <div>
                        <Link href="/dashboard/lessons/create/">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-sm">
                                New Lesson
                            </button>
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left text-blue-500">
                            <thead className="text-xs text-blue-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3" scope="col">Lesson</th>
                                    <th className="px-6 py-3" scope="col">Course</th>
                                    <th className="px-6 py-3" scope="col">Status</th>
                                    <th className="px-6 py-3" scope="col">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessons.map((lesson) => (
                                    <tr key={lesson.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-base font-semibold">
                                                {lesson.title}

                                            </div>
                                            <span className="text-blue-900">{lesson.module.title}</span>
                                        </td>

                                        <td className="px-6 py-4">{lesson.module.course.title}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            {lesson.is_published ? (
                                                <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-xs">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="bg-red-200 text-red-800 py-1 px-2 rounded-full text-xs">
                                                    Not Published
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 space-x-2">
                                            <Link
                                                href={`/dashboard/lessons/${lesson.id}/edit/`}
                                                className="bg-yellow-500 py-1 px-3 text-white rounded-sm">Edit
                                            </Link>
                                            <button className="bg-red-500 py-1 px-3 text-white rounded-sm" onClick={() => deleteLesson(lesson)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
