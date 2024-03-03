import { useState } from 'react';

type SidebarDropdownProps = {
    label: string;
    icon: JSX.Element;
    children: React.ReactNode;
};

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ label, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <li>
            <a onClick={toggleDropdown} className="cursor-pointer flex items-center justify-between w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <span className="flex items-center">
                    {icon}
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">{label}</span>
                </span>
            </a>
            {isOpen && <div className="py-2 space-y-2">{children}</div>}
        </li>
    );
};

export default SidebarDropdown;
