// ConnectionTest.tsx
// Component to test Supabase connection from the frontend

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const ConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...');
  const [blogPostsCount, setBlogPostsCount] = useState<number>(0);
  const [userRolesCount, setUserRolesCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Check if we can connect to Supabase
        const { data: posts, error: postsError } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact' });

        if (postsError) {
          throw new Error(`Blog posts error: ${postsError.message}`);
        }

        setBlogPostsCount(posts.length);
        
        // Test 2: Check user_roles table
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('*', { count: 'exact' });

        if (rolesError) {
          throw new Error(`User roles error: ${rolesError.message}`);
        }

        setUserRolesCount(roles.length);
        
        // Test 3: Check if we can get a single record
        const { data: singlePost, error: singlePostError } = await supabase
          .from('blog_posts')
          .select('*')
          .limit(1)
          .single();

        if (singlePostError && singlePostError.code !== 'PGRST116') { // PGRST116 means no rows returned
          throw new Error(`Single post error: ${singlePostError.message}`);
        }

        setConnectionStatus('✅ Connected successfully!');
      } catch (err) {
        setError(err.message);
        setConnectionStatus('❌ Connection failed');
      }
    };

    testConnection();
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800">Connection Test Failed</h3>
        <p className="text-red-600">{error}</p>
        <div className="mt-2 text-sm text-red-500">
          <p>Please check:</p>
          <ul className="list-disc list-inside">
            <li>Your Supabase credentials in .env file</li>
            <li>That the database tables exist</li>
            <li>Your internet connection</li>
            <li>That your Supabase project is not paused</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800">Supabase Connection Test</h3>
      <p className="text-blue-600">{connectionStatus}</p>
      
      {connectionStatus === '✅ Connected successfully!' && (
        <div className="mt-2 text-sm text-blue-700">
          <p>Database Statistics:</p>
          <ul className="list-disc list-inside">
            <li>Blog posts: {blogPostsCount}</li>
            <li>User roles: {userRolesCount}</li>
          </ul>
          <p className="mt-2">✅ All systems operational!</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;