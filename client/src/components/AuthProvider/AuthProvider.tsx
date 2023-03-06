import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "../../context/AuthContext";
import { message } from "antd";
import { API, BEARER } from "../../constant";
import { getToken } from "../../helpers";
import UserData from "../../models/User";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | undefined>();

    const authToken = getToken();

    const fetchLoggedInUser = async (token: string) => {
        try {
            const response = await fetch(`${API}/users/me`, {
                headers: { Authorization: `${BEARER} ${token}` },
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
            message.error("Error While Getting Logged In User Details");
        }
    };

    const handleUser = (user: UserData) => {
        setUserData(user);
    };

    useEffect(() => {
        if (authToken) {
            fetchLoggedInUser(authToken);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ user: userData, setUser: handleUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
