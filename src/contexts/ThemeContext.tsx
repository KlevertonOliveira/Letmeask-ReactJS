import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

export const ThemeContextProvider = ({children}:ThemeContextProviderProps) => {

  const [currentTheme, setCurrentTheme] = useState<Theme>(()=>{
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme ?? 'light') as Theme;
  });

  useEffect(()=>{
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme])

  const toggleTheme = () =>{
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return(
    <ThemeContext.Provider value={{theme: currentTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () =>{
  return useContext(ThemeContext);
}