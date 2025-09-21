// TestConnection.tsx
// Page to test Supabase connection

import React from 'react';
import ConnectionTest from '../components/ConnectionTest';
import { Link } from 'react-router-dom';

const TestConnection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase Connection Test</h1>
          <p className="text-gray-600">Verifying connection between frontend and Supabase backend</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <ConnectionTest />
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Connection Verification Steps</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-800 text-sm font-bold">1</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Environment Variables</h3>
                <p className="mt-1 text-gray-600">
                  Check that your <code className="bg-gray-100 px-1 rounded">.env</code> file contains:
                </p>
                <pre className="mt-2 bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_KEY=your_supabase_key_here`}
                </pre>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-800 text-sm font-bold">2</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Database Tables</h3>
                <p className="mt-1 text-gray-600">
                  Verify that the following tables exist in your Supabase database:
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  <li><code>blog_posts</code></li>
                  <li><code>user_roles</code></li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-800 text-sm font-bold">3</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Admin User</h3>
                <p className="mt-1 text-gray-600">
                  Ensure you have created an admin user with:
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  <li>Email: <code>admin@playora.com</code></li>
                  <li>Password: <code>AdminPassword123!</code></li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-800 text-sm font-bold">4</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Test Admin Panel</h3>
                <p className="mt-1 text-gray-600">
                  Navigate to <Link to="/login" className="text-blue-600 hover:underline">/login</Link> and sign in with the admin credentials to test full functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestConnection;