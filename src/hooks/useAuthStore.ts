import { create } from 'zustand'; 
 import { persist, createJSONStorage } from 'zustand/middleware'; 
 
 interface User { 
   email: string; 
   name?: string; 
   location?: string; 
   mojoHypeLevel?: 'as-is' | 'chill' | 'turn-up'; 
 } 
 
 interface AuthState { 
   isLoggedIn: boolean; 
   user: User | null; 
   login: (email: string) => void; 
   logout: () => void; 
   updateUserProfile: (profileData: Partial<Omit<User, 'email'>>) => void; 
 } 
 
 export const useAuthStore = create<AuthState>()( 
   persist( 
     (set, get) => ({ 
       isLoggedIn: false, 
       user: null, 
       login: (email) => set({ isLoggedIn: true, user: { email } }), 
       logout: () => set({ isLoggedIn: false, user: null }), 
       updateUserProfile: (profileData) => { 
         const currentUser = get().user; 
         if (currentUser) { 
           set({ user: { ...currentUser, ...profileData } }); 
         } 
       }, 
     }), 
     { 
       name: 'mojo-auth-storage', // name of the item in the storage (must be unique) 
       storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used 
     } 
   ) 
 );