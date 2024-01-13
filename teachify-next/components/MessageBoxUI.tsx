"use client";
import { DarkModeContext } from "@/context/darkModeContext";
import { DARK_MODE_CLASS_NAME } from "@/utils/const";
import { ChangeEvent, useContext, useState } from "react";
import { Message } from '@/types/types';


export const MessageBoxUI = () => {
  const darkModeContext = useContext(DarkModeContext);
  const [messages, setMessages] = useState<any>([]);
  const [userInput, setUserInput] = useState("");

  if (!darkModeContext) {
    throw new Error(
      "MessageBoxUI must be used within a DarkModeContextProvider, No context provided!"
    );
  }

  const { darkMode, updateDarkMode } = darkModeContext;

  const toggleDarkMode = () => {
    updateDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add(DARK_MODE_CLASS_NAME);
    } else {
      document.documentElement.classList.remove(DARK_MODE_CLASS_NAME);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages
    const newUserMessage: Message = { sender: "user", text: userInput };
    setMessages([...messages, newUserMessage]);

    try {
      const response = await fetch("/api/v1/getResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      const { content } = await response.json();
      const newAiMessage : Message = { sender: "ai", text: content };
      setMessages((messages: Message[]) => [...messages, newAiMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setUserInput("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
      setUserInput("");
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
      <div className="flex flex-col flex-1 dark:bg-gray-900 overflow-y-auto">
        <div className="p-4 space-y-2">
          <div className="flex items-end">
            <div className="flex flex-col flex-1 dark:bg-gray-900">
              <div className="p-4 space-y-2">
                {messages.map((message: Message, index: number) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <span
                      className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-800 text-gray-200"
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-secondary dark:border-tertiary px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            className="mb-5 w-full focus:outline-none focus:placeholder-tertiary dark:focus:placeholder-gray-400 text-gray-600 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-400 pl-4 bg-gray-200 dark:bg-gray-700 rounded-full py-3"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="mb-5 absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              onClick={sendMessage}
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
