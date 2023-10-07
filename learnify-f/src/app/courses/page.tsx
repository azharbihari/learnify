"use client"
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import Loading from '@/components/Loading';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/my_courses/');

            if (response.status === 200) {
                setEnrollments(response.data);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError('Failed to fetch enrollments.');
            console.error('Failed to fetch enrollments:', error);
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
                    <div className="max-w-screen-xl mx-auto">
                        <h1 className="text-3xl font-semibold text-blue-900 mb-8">My Enrolled Courses</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments.map((enrollment) => (
                                <div
                                    key={enrollment.course.id}
                                    className="bg-white p-4 rounded shadow-lg hover:shadow-xl transition duration-300"
                                >
                                    <h2 className="text-lg text-blue-900 font-semibold">{enrollment.course.title}</h2>
                                    <p className="text-gray-600 mb-2">Instructor: {enrollment.course.instructor?.first_name}</p>
                                    <p className="text-gray-800 mb-4">{enrollment.course.description}</p>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
                                        View Course
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
