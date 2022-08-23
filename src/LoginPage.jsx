import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from './Login';
import { Profile } from './Profile';
import { LogoutButton } from './Logout';
import React from 'react';
import '@picocss/pico';

function App() {
  const { isAuthenticated } = useAuth0();
    
  return (
    <main>
      {isAuthenticated ? (
          <>
            <Profile />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
    </main>
  );
}

export default App;