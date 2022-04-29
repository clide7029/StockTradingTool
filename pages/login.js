import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

import LoginForm from '../components/auth/loginform';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session.user.name != null) {
        console.log("Session", session);
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <LoginForm />;
}

export default LoginPage;
