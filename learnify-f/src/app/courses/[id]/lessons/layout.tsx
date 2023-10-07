"use client"
import AuthProvider from '@/contexts/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';
import Link from 'next/link';


export default function CourseDetailLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: any;
}) {
    const router = useRouter();
    const { id } = params;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState({});
    const [modules, setModules] = useState([]); // State to store modules

    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/courses/${id}/`);

            if (response.status === 200) {
                setCourse(response.data);
                setModules(response.data.modules || []);
                console.log(response.data)
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch course:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-10">
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-900 mb-4">{course.title}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            {modules && modules.length > 0 ? (
                                <ul className="space-y-4">
                                    {modules.map((module) => (
                                        <li key={module.id}>
                                            <div className="p-2 rounded-lg">
                                                <h2 className="text-lg font-semibold mb-2 text-blue-900">{module.title}</h2>
                                                <ul className="space-y-2">
                                                    {module.lessons && module.lessons.length > 0 ? (
                                                        module.lessons.map((lesson) => (
                                                            <li key={lesson.id} className='text-blue-700'>
                                                                <label className="flex items-center">
                                                                    <input type="checkbox" className="mr-2" defaultChecked={lesson.is_completed} />
                                                                    <Link href={`/courses/${course.id}/lessons/${lesson.id}`} key={lesson.id} className="">
                                                                        {lesson.title}
                                                                    </Link>

                                                                </label>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className='text-blue-900'>No lessons available.</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='text-blue-900'>No modules available.</p>
                            )}
                        </div>
                        <div className="md:col-span-3">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}