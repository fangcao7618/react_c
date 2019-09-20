// ✅使用 useState
import React, { createContext, useState } from "react";

// 1. 使用 createContext 创建上下文
export const UserContext = new createContext();

// 2. 创建 Provider
export const UserProvider = props => {
    let [username, handleChangeUsername] = useState("");
    return (
        <UserContext.Provider value={{ username, handleChangeUsername }}>
            {props.children}
        </UserContext.Provider>
    );
};

// 3. 创建 Consumer
export const UserConsumer = UserContext.Consumer;
