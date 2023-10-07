"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';

export default function Page({ params }) {
    const router = useRouter();
    const { id } = params;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [course, setCourse] = useState({});


    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        console.log(id)
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/courses/${id}/`);

            if (response.status === 200) {
                setCourse(response.data);
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
        <div>
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (

                <div className="bg-gray-100 min-h-screen p-8">
                    <div className="max-w-screen-xl mx-auto bg-white p-8 rounded shadow-lg">
                        <div className="grid grid-cols-12 gap-8">

                            <div className="col-span-8">
                                <h1 className="text-3xl text-blue-900 font-semibold mb-4">{course.title}</h1>
                                <p className="text-gray-600 mb-4">Instructor: {course.instructor?.first_name}</p>
                                <p className="text-gray-800 mb-8">{course.description}</p>
                            </div>


                            <div className="col-span-4">
                                <img src='https://source.unsplash.com/400x300' alt={course.title} className="w-full rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
