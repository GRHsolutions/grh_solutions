import { createContext, ReactNode, useContext } from "react";
import { ParametrosProvider } from "./useParamether.provider";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ParametrosProvider>
      <GlobalContext.Provider 
        value={{}}
      >
        {children}
      </GlobalContext.Provider>
    </ParametrosProvider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
