import React from 'react';

const AboutUs = () => {
    const teamMembers = [
        {
            name: 'Jane Doe',
            role: 'Co-Founder / CEO',
            bio: 'Jane has over 10 years of experience in the industry. She loves coffee and is passionate about building products that make a difference.',
            imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
        },
        {
            name: 'John Smith',
            role: 'Co-Founder / CTO',
            bio: 'John is a tech enthusiast with a rich background in software development. In his free time, he enjoys hiking and coding.',
            imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-100 py-12 flex-grow">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">About Us</h2>
                    <ul className="space-y-10">
                        {teamMembers.map((member, index) => (
                            <li key={index} className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
                                <img className="w-full h-56 object-cover object-center mb-6" src={member.imageUrl} alt={member.name} />
                                <h3 className="text-xl font-semibold mb-3">{member.name}</h3>
                                <p className="text-md text-gray-600 mb-4">{member.role}</p>
                                <p className="text-gray-700">{member.bio}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <footer className="bg-gray-800 text-white p-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <p className="text-md">© 2024 Company Name. All rights reserved.</p>
                    <div className="flex items-center">
                        <a href="mailto:contact@example.com" className="text-white mr-6 hover:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M0 4v16h24V4H0zm22 2v.01L12 13 2 6.01V6h20zM2 18V8l10 7 10-7v10H2z"/></svg>
                        </a>
                        <a href="#" className="text-white mr-6 hover:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm6.25 3a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm-3.25 2a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Zm0 1.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"/></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;