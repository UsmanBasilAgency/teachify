import Link from "next/link";
import Image from 'next/image'

type CourseCardProps = {
    course: string;
    professor: string;
    description: string;
    university: string;
    imageURL: string;
};

export const Card: React.FC<CourseCardProps> = ({
    course,
    professor,
    description,
    university,
    imageURL
}) => {
    return (
        <div className="flex flex-col h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <span className="h-full w-full">
                <Image className="rounded-t-lg" src={imageURL} alt="" layout="responsive" width={600} height={600}/>
            </span>
            <div className="flex-grow p-5">
                <span>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course} - {professor}</h5>
                </span>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            </div>
            <div className="p-5 pt-0">
                <Link href={`/${course}`} className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Click
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};
