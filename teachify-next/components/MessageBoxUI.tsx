"use client";

import { useChat } from 'ai/react';
import Sidebar from "./Sidebar";

export const MessageBoxUI = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/v1/getResponse'
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 dark:bg-gray-900 overflow-y-auto">
        <div className="p-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-blue-800 text-gray-200"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-2 border-secondary dark:border-tertiary px-4 pt-4 mb-2 sm:mb-0">
        <div className="flex justify-between">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              type="text"
              className="flex-grow mb-5 focus:outline-none focus:placeholder-tertiary dark:focus:placeholder-gray-400 text-gray-600 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-400 pl-4 bg-gray-200 dark:bg-gray-700 rounded-l-full py-3"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="mb-5 inline-flex items-center justify-center rounded-r-full h-12 w-12 transition duration-500 ease-in-out text-white bg-primary dark:bg-secondary hover:bg-primary-dark dark:hover:bg-secondary-dark focus:outline-none"
            >
              <img src="/send.svg" alt="Send" className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
