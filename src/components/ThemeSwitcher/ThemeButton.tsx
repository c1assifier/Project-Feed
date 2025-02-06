import React from 'react';
import { useTheme } from './useTheme';
import styles from './Theme.module.css'
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';  

const ThemeButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
  
    return (
      <div className={styles.switcher}>
        <button onClick={toggleTheme} className={styles.iconButton}>
          {theme === 'light' ? <IoMoon size={24} /> : <LuSun size={24} />}
        </button>
      </div>
    );
  };
  
  export default ThemeButton;