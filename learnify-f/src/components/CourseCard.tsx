import React from 'react';

export default function CourseCard({ course }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Course Image */}
            <img
                src="https://source.unsplash.com/308x128"
                alt={course.title}
                className="w-full h-40 object-cover"
            />

            <div className="p-4">
                {/* Course Title */}
                <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>

                {/* Course Description */}
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                {/* Course Dates */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-semibold">Start Date:</span> {course.start_date}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-semibold">End Date:</span> {course.end_date}
                </div>


                {/* Published Status */}
                <div className="mt-4">
                    {course.is_published ? (
                        <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-xs">
                            Published
                        </span>
                    ) : (
                        <span className="bg-red-200 text-red-800 py-1 px-2 rounded-full text-xs">
                            Not Published
                        </span>
                    )}
                </div>
            </div>
        </div>


    );
};
