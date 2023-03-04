import { createContext, useContext } from "react";
import { useRouter } from "next/router";

interface AppContextProps {
  pathname: string;
}

const AppContext = createContext<AppContextProps>({ pathname: "" });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <AppContext.Provider value={{ pathname }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
