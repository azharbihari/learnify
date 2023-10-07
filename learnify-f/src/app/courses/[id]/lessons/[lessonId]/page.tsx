"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';

export default function Page({ params }) {
    const router = useRouter();
    const { lessonId } = params;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [lesson, setLesson] = useState({});


    useEffect(() => {
        fetchLesson();
    }, []);

    const fetchLesson = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/lessons/${lessonId}/`);

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

    const markLessonAsCompleted = async (lesson) => {
        try {
            const response = await axiosInstance.post(`/progresses/${lesson.id}/`);
            if (response.status === 200) {
                setLesson({ ...lesson, is_completed: true });
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError('Failed to mark lesson as completed. Please try again later.');
            console.error('Error marking lesson as completed:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (

                <div className="bg-gray-100 min-h-screen p-8">
                    <div className="max-w-screen-xl mx-auto bg-white p-8 rounded shadow-lg">
                        {lesson.is_completed ? (
                            <p className="text-green-600">Completed!</p>
                        ) : (
                            <button onClick={() => markLessonAsCompleted(lesson)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Mark as Completed
                            </button>
                        )}
                        <p className='text-xl text-blue-950'>{lesson.title}</p>

                        <div className='text-blue-950' dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};
