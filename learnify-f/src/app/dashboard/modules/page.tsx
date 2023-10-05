"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';

export default function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [modules, setModules] = useState([]);
    const router = useRouter();


    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/modules');

            if (response.status === 200) {
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


    const deleteModule = async (module) => {
        const confirmDelete = confirm('Are you sure you want to delete this module?');
        if (confirmDelete) {
            try {
                const response = await axiosInstance.delete(`/modules/${module.id}/delete/`);

                if (response.status === 204) {
                    console.log(response.data);
                    setModules((modules) => modules.filter((m) => m.id !== module.id));
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error deleting module:', error);
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
                        <h1 className="text-2xl font-semibold text-gray-800">Module Management</h1>
                        <p className="text-gray-600">Explore and manage modules from all your courses in one place.</p>
                    </div>
                    <div>
                        <Link href="/dashboard/modules/create/">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-sm">
                                New Module
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
                                    <th className="px-6 py-3" scope="col">Number of Lessons</th>
                                    <th className="px-6 py-3" scope="col">Course</th>
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
                                        <td className="px-6 py-4">
                                            <span className="inline-block bg-gray-200 text-black px-2 py-1 rounded-full text-sm">
                                                {module.number_of_lessons} Lessons
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{module.course.title}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            <Link
                                                href={`/dashboard/modules/${module.id}/edit/`}
                                                className="bg-yellow-500 py-1 px-3 text-white rounded-sm">Edit
                                            </Link>
                                            <button className="bg-red-500 py-1 px-3 text-white rounded-sm" onClick={() => deleteModule(module)}>Delete</button>
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
