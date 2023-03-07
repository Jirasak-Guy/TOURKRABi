import { createContext, useContext } from "react";
import UserData from "../models/User";

export const AuthContext = createContext({
    user: undefined as UserData | undefined,
    setUser: (handle: any) => {}, 
});

export const useAuthContext = () => useContext(AuthContext);
