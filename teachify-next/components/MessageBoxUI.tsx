"use client";
import { useState } from "react";

export const MessageBoxUI = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <div className="p-4 flex justify-end">
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
      </div>
      <div className="flex flex-col flex-1 dark:bg-gray-900">
        <div className="p-4 space-y-2">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-primary dark:bg-secondary text-white dark:text-gray-200">
                  Hello, how can I help you?
                </span>
              </div>
            </div>
          </div>
          {/* Additional messages can go here */}
        </div>
      </div>
      <div className="border-t-2 border-secondary dark:border-tertiary px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            className="mb-5 w-full focus:outline-none focus:placeholder-tertiary dark:focus:placeholder-gray-400 text-gray-600 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-400 pl-4 bg-gray-200 dark:bg-gray-700 rounded-full py-3"
            placeholder="Type your message..."
          />
          <div className="mb-5 absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-primary dark:bg-secondary hover:bg-primary-dark dark:hover:bg-secondary-dark focus:outline-none"
            >
              <img src="/send.svg" alt="Send" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
