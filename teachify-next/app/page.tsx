import { MessageBoxUI } from '@/components/MessageBoxUI';
import { DarkModeContextProvider } from '@/context/darkModeContext';

export default function Home() {
  return (
    <DarkModeContextProvider>
      <MessageBoxUI />
    </DarkModeContextProvider>
  );
}
