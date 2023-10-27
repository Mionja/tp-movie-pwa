import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<User | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
