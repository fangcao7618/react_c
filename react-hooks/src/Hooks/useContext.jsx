import React, { useContext } from "react"; // 1
import { UserProvider, UserContext } from "./UserContext"; // 2
const Pannel = () => {
    const { username, handleChangeUsername } = useContext(UserContext); // 3
    return (
        <div>
            <div>user: {username}</div>
            <input onChange={e => handleChangeUsername(e.target.value)} />
        </div>
    );
};

const Form = () => <Pannel></Pannel>;

// 4
const App = () => (
    <div>
        <UserProvider>
            <Form></Form>
        </UserProvider>
    </div>
);

export default App;
