import React, { useState, useEffect } from "react";

const Form = () => {
    const [name, setName] = useState("Mary"); // State 变量 1
    const [surname, setSurname] = useState("Poppins"); // State 变量 2
    const [width, setWidth] = useState(window.innerWidth); // State 变量 3

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSurnameChange(e) {
        setSurname(e.target.value);
    }
    return (
        <>
            <input value={name} onChange={handleNameChange} />
            <input value={surname} onChange={handleSurnameChange} />
            <p>
                Hello, {name} {surname}
            </p>
            <p>Window width: {width}</p>
        </>
    );
};

export default Form;
