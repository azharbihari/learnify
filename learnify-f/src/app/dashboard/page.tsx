"use client"
import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Link from 'next/link'
import axiosInstance from '@/axios';



export default function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);





    useEffect(() => {

    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto my-8">
                {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="text-center m-12 text-pink-900">Dashboard Page</div>

                )}
            </div>
        </div>
    );
};