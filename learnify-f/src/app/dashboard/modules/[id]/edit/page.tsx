"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation'
import InputField from '@/components/InputField';
import TextareaField from '@/components/TextareaField';
import CheckboxField from '@/components/CheckboxField';
import SelectField from '@/components/SelectField';

export default function Page({ params }) {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState([]);
    const router = useRouter()
    const { id } = params;


    const fetchModule = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/modules/${id}/`);

            if (response.status === 200) {
                setModule(response.data);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch module:', error);
        } finally {
            setLoading(false);
        }
    };


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

    useEffect(() => {
        fetchCourses()
        fetchModule()
    }, []);



    const [module, setModule] = useState({
        title: '',
        description: '',
        course: '',
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setModule(values => ({ ...values, [name]: value }))
    }

    const editModule = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/modules/${id}/update/`, module);

            if (response.status === 200) {
                console.log(response.data);
                setLoading(false);
                router.back();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to update module:', error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
    }, []);

    return (
        <div className="container mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Edit Module</h1>
                    <p className="text-gray-600">Manage your courses and enrollments.</p>
                </div>
                <div>
                    <Link href="/dashboard/modules/">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-sm">
                            Back to Modules
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <form onSubmit={editModule} className="bg-white p-6 rounded-lg shadow-md">


                    <SelectField
                        label="Course"
                        name="course"
                        id="course"
                        value={module.course}
                        onChange={handleChange}
                        options={courses.map((module) => ({
                            label: module.title,
                            value: module.id,
                        }))}
                    />

                    <InputField
                        label="Title"
                        name="title"
                        type="text"
                        id="title"
                        value={module.title}
                        onChange={handleChange}
                    />


                    <TextareaField
                        label="Description"
                        id="description"
                        name="description"
                        value={module.description}
                        onChange={handleChange}
                    />

                    <div className="flex items-center justify-between">
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
        </div >
    );
};