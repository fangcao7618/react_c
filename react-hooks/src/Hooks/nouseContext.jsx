import React from "react";
import { UserConsumer, UserProvider } from "./UserContext";
/**
 * 不使用 useContext
 */
const Pannel = () => (
    <UserConsumer>
        {/* 不使用 useContext 需要调用 Consumer 包裹 children */}
        {({ username, handleChangeUsername }) => (
            <div>
                <div>user: {username}</div>
                <input onChange={e => handleChangeUsername(e.target.value)} />
            </div>
        )}
    </UserConsumer>
);

const Form = () => <Pannel></Pannel>;

const App = () => (
    <div>
        <UserProvider>
            <Form></Form>
        </UserProvider>
    </div>
);

export default App;
