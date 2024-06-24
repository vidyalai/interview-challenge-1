import { useEffect, useState } from 'react';

// ClientOnly component ensures that its children are rendered only on the client-side.
// This is useful to prevent server-side specific code or effects from running during server-side rendering (SSR).
const ClientOnly = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return children;
};

export default ClientOnly;
