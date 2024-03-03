import React from 'react';
import Link from 'next/link';

type SidebarLinkProps = {
    href: string;
    icon: JSX.Element;
    label: string;
    onClick?: () => void;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, label }) => {
    return (
        <li>
            <Link
                href={href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                {icon}
                <span className="flex-1 ms-3 whitespace-nowrap">
                    {label}
                </span>
            </Link>
        </li>
    );
};

export default SidebarLink;
