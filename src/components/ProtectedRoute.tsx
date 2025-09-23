import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { authService } from '../services/authService';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // First check if we have a dev user in localStorage
      if (import.meta.env.DEV) {
        const devUser = localStorage.getItem('dev-admin-user');
        if (devUser) {
          console.log('Found dev user in localStorage');
          const user = JSON.parse(devUser);
          const isAdmin = user.role === 'admin';
          console.log('Dev user is admin:', isAdmin);
          setAuthed(isAdmin);
          setReady(true);
          return;
        }
      }
      
      // Otherwise check Supabase session
      const { data } = await supabase.auth.getSession();
      console.log('Supabase session data:', data);
      const isAuthenticated = !!data.session;
      
      if (isAuthenticated) {
        // Check if user is admin
        const isAdmin = await authService.isAdmin();
        console.log('Supabase user is admin:', isAdmin);
        setAuthed(isAdmin);
      } else {
        setAuthed(false);
      }
      
      setReady(true);
    };
    
    checkAuth();
    
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      console.log('Auth state changed:', _e, session);
      const isAuthenticated = !!session;
      
      if (isAuthenticated) {
        // Check if user is admin
        const isAdmin = await authService.isAdmin();
        console.log('Auth state change - user is admin:', isAdmin);
        setAuthed(isAdmin);
      } else {
        // Check if we have a dev user in localStorage
        if (import.meta.env.DEV) {
          const devUser = localStorage.getItem('dev-admin-user');
          if (devUser) {
            console.log('Found dev user in localStorage during auth state change');
            const user = JSON.parse(devUser);
            const isAdmin = user.role === 'admin';
            console.log('Dev user is admin during auth state change:', isAdmin);
            setAuthed(isAdmin);
            return;
          }
        }
        setAuthed(false);
      }
      
      setReady(true);
    });
    
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return null; // or a spinner
  return authed ? children : <Navigate to="/login" replace />;
}