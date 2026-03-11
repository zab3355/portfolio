import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useRouteChange = () => {
  const location = useLocation();
  const [selectedRoute, setSelectedRoute] = useState(location.pathname);

  useEffect(() => {
    setSelectedRoute(location.pathname);
  }, [location]);

  return selectedRoute;
};

export default useRouteChange;