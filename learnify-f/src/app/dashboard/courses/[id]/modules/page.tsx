"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';

export default function Page({ params }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [modules, setModules] = useState([]);
    const [course, setCourse] = useState(null);
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        fetchModules();
    }, []); // Empty dependency array to trigger the effect only on component mount.

    const fetchModules = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/courses/${id}/modules/`);

            if (response.status === 200) {
                setCourse(response.data.course);
                setModules(response.data.modules);
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

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Manage Modules</h1>
                        {course && (
                            <p className="text-gray-600">
                                Manage modules for the <span className="text-blue-600">{course.title}</span> course.
                            </p>
                        )}
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
                    <Loading />
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left text-blue-500">
                            <thead className="text-xs text-blue-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3" scope="col">Module</th>
                                    <th className="px-6 py-3" scope="col">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {modules.map((module) => (
                                    <tr key={module.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-base font-semibold">{module.title}</div>
                                            <div className="font-normal text-gray-500">{module.description}</div>
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            <Link
                                                href={`/dashboard/modules/${module.id}/edit/`}
                                                className="bg-yellow-500 py-1 px-3 text-white rounded-sm">Edit
                                            </Link>
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
