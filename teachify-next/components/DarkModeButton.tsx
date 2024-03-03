import { useDarkMode } from "@/hooks/useDarkMode";

export const DarkModeButton = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    return (<div className="p-4 flex justify-end">
    <label className="flex items-center cursor-pointer">
        <div className="relative">
            <input
                type="checkbox"
                id="darkModeToggle"
                className="sr-only"
                onChange={toggleDarkMode}
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full dark:bg-gray-700"></div>
            <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                    darkMode ? "transform translate-x-6" : ""
                }`}
            ></div>
        </div>
        <div
            className="ml-3 text-gray-700 dark:text-gray-300 font-medium"
            onClick={toggleDarkMode}
        >
            Dark Mode {darkMode ? "On" : "Off"}
        </div>
    </label>
</div>)
}