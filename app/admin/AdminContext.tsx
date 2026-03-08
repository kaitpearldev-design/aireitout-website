"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type AdminContextType = {
  refreshKey: number;
  lastRefreshed: Date;
  refresh: () => void;
};

const AdminContext = createContext<AdminContextType>({
  refreshKey: 0,
  lastRefreshed: new Date(),
  refresh: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
    setLastRefreshed(new Date());
  }, []);

  return (
    <AdminContext.Provider value={{ refreshKey, lastRefreshed, refresh }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
