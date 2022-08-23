import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from './Login';
import { Profile } from './Profile';
import { LogoutButton } from './Logout';
import React from 'react';
import '@picocss/pico';

function LoginPage() {
  const { isAuthenticated } = useAuth0();
    
  return (
    <div>
      {isAuthenticated ? (
          <>
            <Profile />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
    </div>
  );
}

export default LoginPage;