import { createContext, useState, ReactNode } from "react";

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  noAuth: any;
  setNoAuth: React.Dispatch<React.SetStateAction<any>>;
  isChangeAddress: boolean;
  setIsChangeAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export const userContext = createContext<UserContextType | null>(null);

interface Props {
  children: ReactNode;
}



interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [noAuth, setNoAuth] = useState<any>(null);
  const [isChangeAddress, setIsChangeAddress] = useState<boolean>(false);

  return (
    <userContext.Provider
      value={{ user, setUser, noAuth, setNoAuth, isChangeAddress ,setIsChangeAddress}}
    >
      {children}
    </userContext.Provider>
  );
};
