"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'

export default function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState([]);
    const router = useRouter()

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get('/courses/');

            if (response.status === 200) {
                console.log(response.data);
                setLoading(false);
                setCourses(response.data)
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch courses:', error);
        } finally {
            setLoading(false);
        }
    };


    const deleteCourse = async (course) => {
        const confirmDelete = confirm('Are you sure you want to delete this course?');
        if (confirmDelete) {
            try {
                const response = await axiosInstance.delete(`/courses/${course.id}`);

                if (response.status === 204) {
                    console.log(response.data);
                    setCourses((courses) => courses.filter((c) => c.id !== course.id));
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error deleting course:', error);
            } finally {
                setLoading(false);
            }
        }

    };




    useEffect(() => {
        fetchCourses()
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="container mx-auto">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Course Management</h1>
                        <p className="text-gray-600">Manage your courses and enrollments.</p>
                    </div>
                    <div>
                        <Link href="/dashboard/courses/create/">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-sm">
                                New Course
                            </button>
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left text-blue-500">
                            <thead className="text-xs text-blue-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3" scope="col">Course</th>
                                    <th className="px-6 py-3" scope="col">Number of Modules</th>
                                    <th className="px-6 py-3" scope="col">Status</th>
                                    <th className="px-6 py-3" scope="col">
                                        Actions
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-base font-semibold">{course.title}</div>
                                            <div className="font-normal text-gray-500">{course.description}</div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="inline-block bg-gray-200 text-black px-2 py-1 rounded-full text-sm">
                                                {course.number_of_modules} Modules
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 space-x-2">
                                            {course.is_published ? (
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
                                                href={`/dashboard/courses/${course.id}/edit/`}
                                                className="bg-yellow-500 py-1 px-3 text-white rounded-sm">Edit
                                            </Link>
                                            <button className="bg-red-500 py-1 px-3 text-white rounded-sm" onClick={() => deleteCourse(course)}>Delete</button>

                                            <Link
                                                href={`/dashboard/courses/${course.id}/modules/`}
                                                className="bg-blue-500 py-1 px-3 text-white rounded-sm">Modules
                                            </Link>

                                            <Link
                                                href={`/courses/enrollments/${course.id}`}
                                                className="text-green-500"><button className="bg-green-500 py-1 px-3 text-white rounded-sm">Enrollments</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                )}
            </div>
        </div >
    );
};