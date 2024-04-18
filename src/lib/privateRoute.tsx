import React from 'react'
import { useRouter } from 'next/router'
import useAuth from '@/auth/useAuth'
import { PrivateRouteProps } from '@/lib/interfaces'

const PrivateRoute: React.FC<PrivateRouteProps> = ({ hasRole: role, children }) => {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) {
    return null;
  }

  const { hasRole, isLogged } = auth;

  if (isLogged()) {
    if (role && !hasRole(role)) {
      router.replace('/');
    }
    return children;
  } else {
    router.replace('/login');
  }

  return null;
}

export default PrivateRoute