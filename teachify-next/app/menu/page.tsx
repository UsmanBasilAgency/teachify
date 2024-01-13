'use client'
import React, { useContext } from 'react';
import Sidebar from '@/components/Sidebar';
import { DarkModeContext, DarkModeContextProvider } from '@/context/darkModeContext';
import { Card } from '@/components/Card';

export default function Menu() {
  return (
    <DarkModeContextProvider>
      <MenuContent />
    </DarkModeContextProvider>
  );
}

const MenuContent = () => {
  const darkMode = useContext(DarkModeContext);
  const containerClass = darkMode ? 'dark:bg-gray-800 h-lvh' : 'bg-gray-100 h-lvh';

  return (
    <div className={`w-full menu-container ${containerClass}`}>
      <Sidebar />
      <Card course="CIS2430" professor="Judi McCuaig" description="Delve into Object Oriented Programming" university="University of Guelph" />
    </div>
  );
}
