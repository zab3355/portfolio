import { createContext, useCallback, useContext, useState, ReactNode } from 'react';

interface AppLoadContextValue {
  isAppReady: boolean;
  setAppReady: () => void;
  resetAppReady: () => void;
}

const AppLoadContext = createContext<AppLoadContextValue>({
  isAppReady: false,
  setAppReady: () => {},
  resetAppReady: () => {},
});

export const AppLoadProvider = ({ children }: { children: ReactNode }) => {
  const [isAppReady, setIsAppReady] = useState(false);

  const setAppReady = useCallback(() => setIsAppReady(true), []);
  const resetAppReady = useCallback(() => setIsAppReady(false), []);

  return (
    <AppLoadContext.Provider value={{ isAppReady, setAppReady, resetAppReady }}>
      {children}
    </AppLoadContext.Provider>
  );
};

export const useAppLoad = () => useContext(AppLoadContext);
