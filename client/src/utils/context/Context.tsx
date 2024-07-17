import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface NavContextType {
  open: boolean;
  isOpen: Dispatch<SetStateAction<boolean>>;
}


export const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [open , isOpen] = useState<boolean>(false)

  return ( <NavContext.Provider value={{open , isOpen}}>
    {children}
  </NavContext.Provider>

  )
}