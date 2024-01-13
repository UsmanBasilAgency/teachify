import Link from 'next/link';

export default function LoadingIndicator() {
    return ( 
        <div className="flex items-center justify-center w-56 h-6">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">loading...</div>
        </div>
    )
}