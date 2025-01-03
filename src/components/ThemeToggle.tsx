import { useTheme } from '@/Providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const {theme,setTheme} = useTheme();
    const isDark = theme === 'dark';
    return (
        <div onClick={isDark ? () => setTheme('light') : () => setTheme('dark')} className={`  cursor-pointer flex items-center transition-all duration-500 ${isDark ? 'rotate-180' : 'rotate-0'} `} >  
            {isDark ? (
                <Sun className='w-6 h-6 text-yellow-400 rotate-0 transition-all ' />
            ) : (
                <Moon  className='w-6 h-6 text-blue-400 rotate-0 transition-all ' />
            )}
        </div>
    )
}

export default ThemeToggle
