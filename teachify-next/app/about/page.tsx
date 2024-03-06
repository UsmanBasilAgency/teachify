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
        <div className="bg-gray-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">About Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
                            <img className="w-full h-56 object-cover object-center mb-6" src={member.imageUrl} alt={member.name} />
                            <h3 className="text-xl font-semibold mb-3">{member.name}</h3>
                            <p className="text-md text-gray-600 mb-4">{member.role}</p>
                            <p className="text-gray-700">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;