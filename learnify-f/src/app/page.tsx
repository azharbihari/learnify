"use client"
import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Link from 'next/link'
import Image from 'next/image'
import CourseCard from '@/components/CourseCard';
import axiosInstance from '@/axios';



export default function Page() {


  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  return (
    <div className="container mx-auto my-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};
