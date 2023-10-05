"use client"
import React, { useEffect, useState } from 'react';

export default function Footer() {

    return (
        <footer className="bg-pink-50 text-pink-900 py-8">
            <div className="container mx-auto flex flex-col items-center">
                <div className="mb-4">
                    Learnify
                </div>
                <p className="text-sm text-pink-900 mb-4">
                    &copy; {new Date().getFullYear()} Learnify. All rights reserved.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="text-gray-500 hover:text-white transition duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-white transition duration-300"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-white transition duration-300"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-white transition duration-300"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}
