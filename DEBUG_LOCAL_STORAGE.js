// DEBUG_LOCAL_STORAGE.js
// Script to debug localStorage issues in development mode

function debugLocalStorage() {
  console.log('=== LocalStorage Debug ===');
  
  try {
    // Check if localStorage is available
    const hasLocalStorage = typeof localStorage !== 'undefined';
    console.log('LocalStorage available:', hasLocalStorage);
    
    if (hasLocalStorage) {
      // Check for dev admin user
      const devUser = localStorage.getItem('dev-admin-user');
      console.log('Dev admin user in localStorage:', devUser);
      
      if (devUser) {
        try {
          const parsedUser = JSON.parse(devUser);
          console.log('Parsed dev user:', parsedUser);
        } catch (parseError) {
          console.log('Error parsing dev user:', parseError.message);
        }
      }
      
      // Check all localStorage items
      console.log('\nAll localStorage items:');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`  ${key}: ${value}`);
      }
    } else {
      console.log('LocalStorage is not available in this environment');
    }
  } catch (error) {
    console.error('LocalStorage Debug Error:', error);
  }
  
  console.log('=== End LocalStorage Debug ===');
}

// Run the debug function
debugLocalStorage();