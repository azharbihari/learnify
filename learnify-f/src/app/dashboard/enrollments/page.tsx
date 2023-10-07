"use client"
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import Loading from '@/components/Loading';

export default function EnrollmentsPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/enrollments');

            if (response.status === 200) {
                setEnrollments(response.data);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Enrollments</h1>
                    <p className="text-gray-600">List of all enrollments.</p>
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
                                    <th className="px-6 py-3" scope="col">Course</th>
                                    <th className="px-6 py-3" scope="col">User</th>
                                    <th className="px-6 py-3" scope="col">Enrollment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-base font-semibold">
                                                {enrollment.course.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{enrollment.student.username}</td>
                                        <td className="px-6 py-4">{enrollment.date_enrolled}</td>
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
