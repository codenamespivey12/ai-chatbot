import React, { useState, useEffect } from 'react'; 
 import { Bars3Icon, MoonIcon, SunIcon, ClockIcon } from '@heroicons/react/24/outline'; 
 import { useTheme } from '@/app/providers/ThemeProvider'; 
 import { Button } from '@/components/ui/button'; // ShadCN Button 
 import { motion } from 'framer-motion'; 
 import { format } from 'date-fns'; // For date/time formatting 
 
 interface HeaderProps { 
   onToggleSidebar: () => void; 
 } 
 
 const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => { 
   const { theme, setTheme } = useTheme(); 
   const [currentTime, setCurrentTime] = useState(new Date()); 
 
   useEffect(() => { 
     const timerId = setInterval(() => setCurrentTime(new Date()), 1000); 
     return () => clearInterval(timerId); 
   }, []); 
 
   const toggleTheme = () => { 
     setTheme(theme === 'light' ? 'dark' : 'light'); 
   }; 
 
   const formattedTime = format(currentTime, 'p'); // e.g., 12:30 PM 
   const formattedDate = format(currentTime, 'EEEE, MMMM do'); // e.g., Monday, April 15th 
 
   return ( 
     <header className="bg-mojo-blue dark:bg-gray-900 text-white shadow-comic-strong flex items-center justify-between p-3 h-16 border-b-4 border-comic-ink dark:border-mojo-yellow"> 
       <div className="flex items-center"> 
         <Button 
           variant="ghost" 
           size="icon" 
           onClick={onToggleSidebar} 
           className="mr-3 text-white hover:bg-mojo-blue-light dark:hover:bg-gray-700 comic-border-soft border-mojo-yellow hover:border-mojo-yellow" 
           aria-label="Toggle Sidebar" 
         > 
           <Bars3Icon className="h-7 w-7" /> 
         </Button> 
         <motion.div 
           initial={{ y: -50, opacity: 0 }} 
           animate={{ y: 0, opacity: 1 }} 
           transition={{ type: 'spring', stiffness: 120, delay: 0.2 }} 
         > 
           <h1 className="font-heading text-2xl md:text-3xl text-mojo-yellow tracking-wider"> 
             <span className="text-sm md:text-base text-white block leading-tight -mb-1">sixtyoneeighty ft.</span> 
             MOJO 
           </h1> 
         </motion.div> 
       </div> 
 
       <div className="flex items-center space-x-3 md:space-x-4"> 
         <motion.div 
           className="hidden md:flex items-center space-x-2 bg-comic-bg dark:bg-gray-800 text-comic-ink dark:text-mojo-yellow px-3 py-1 rounded-md comic-border-soft border-mojo-blue dark:border-mojo-yellow" 
           initial={{ opacity: 0, scale: 0.5 }} 
           animate={{ opacity: 1, scale: 1 }} 
           transition={{ delay: 0.4 }} 
         > 
           <ClockIcon className="h-5 w-5" /> 
           <div> 
             <p className="text-xs font-sans font-bold leading-tight">{formattedTime}</p> 
             <p className="text-xs font-sans leading-tight">{formattedDate}</p> 
           </div> 
         </motion.div> 
 
         <motion.div 
           whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }} 
           transition={{ duration: 0.3 }} 
         > 
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={toggleTheme} 
             className="text-white hover:bg-mojo-blue-light dark:hover:bg-gray-700 comic-border-soft border-mojo-yellow hover:border-mojo-yellow" 
             aria-label="Toggle Theme" 
           > 
             {theme === 'light' ? ( 
               <MoonIcon className="h-6 w-6 text-mojo-yellow" /> 
             ) : ( 
               <SunIcon className="h-6 w-6 text-mojo-yellow" /> 
             )} 
           </Button> 
         </motion.div> 
       </div> 
     </header> 
   ); 
 }; 
 
 export default Header;