'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  
  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle theme toggle with animation
  const toggleTheme = () => {
    setIsChanging(true);
    
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      
      setTimeout(() => {
        setIsChanging(false);
      }, 500);
    }, 300);
  };
  
  if (!mounted) {
    return (
      <button
        className="relative h-9 w-9 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center"
        disabled
      >
        <Sparkles className="h-4 w-4 text-gray-400" />
      </button>
    );
  }
  
  return (
    <button
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {/* Background effect */}
      {isChanging && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 5, opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 rounded-full ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
              : 'bg-gradient-to-br from-orange-500 to-yellow-500'
          }`}
          style={{ transformOrigin: 'center' }}
        />
      )}
      
      {/* Icon */}
      <div className="relative z-10">
        {theme === 'dark' ? (
          <Moon className="h-5 w-5 text-blue-400" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
      </div>
      
      {/* Particle effects */}
      {isChanging && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0 
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 30, 
                y: (Math.random() - 0.5) * 30,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.05
              }}
              className={`absolute h-1 w-1 rounded-full ${
                theme === 'dark' 
                  ? 'bg-yellow-400' 
                  : 'bg-blue-400'
              }`}
            />
          ))}
        </>
      )}
    </button>
  );
} 