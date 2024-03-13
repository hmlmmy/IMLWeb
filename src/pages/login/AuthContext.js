// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';  // 确保导入 axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const loginUser = async (userData) => {
        try {
            if (!userData || typeof userData !== 'object') {
                console.error('Invalid userData:', userData);
                return null;
            }

            const response = await axios.post('http://localhost:8080/api/auth/login', userData);

            const processedUserData = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                // 其他属性...
            };

            setUser(processedUserData);
            setIsLoggedIn(true);

            return processedUserData;
        } catch (error) {
            console.error('登录失败:', error);
            // 根据需要处理登录错误
            return null;
        }
    };

    const updateUser = async (updatedUserData) => {
        try {
            if (!updatedUserData || typeof updatedUserData !== 'object') {
                console.error('Invalid updatedUserData:', updatedUserData);
                return null;
            }

            const response = await axios.put(`http://localhost:8080/api/user/${user.id}`, updatedUserData);

            if (response.status === 200) {
                console.log('用户信息更新成功');
                const processedUserData = {
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    // 其他属性...
                };
                setUser(processedUserData);
                return processedUserData;
            } else {
                console.error('用户信息更新失败');
                return null;
            }
        } catch (error) {
            console.error('用户信息更新过程中出现错误:', error);
            return null;
        }
    };

    const logoutUser = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, loginUser, updateUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    return authContext;
};

export default AuthContext;
