//https://juejin.im/post/5c8918ca6fb9a049f572023e#heading-2

//深入 React Hook 系统的原理 https://juejin.im/post/5c99a75af265da60ef635898#heading-0
import React, {
    useState,
    useEffect,
    useRef,
    createContext,
    useContext
} from "react"; //1
import NouseContext from "./nouseContext.jsx";
import UseContext from "./useContext";
//useEffect = componentDidMount + componentDidUpdate
// useContext:简化Context的使用

// 1. 使用 createContext 创建上下文
export const UserContext = new createContext(); //2

const Counter = () => {
    const [toggle, setToggle] = useState(true);

    //为什么只能在函数最外层调用 Hook，不要在循环、条件判断或者子函数中调用？
    const [count, setCount] = useState(0);
    const [name, vName] = useState("Morgan");
    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);
    const changeInput = e => vName(e.target.value);

    //注意：每一次渲染都有独立的props和state
    const onClick = () => {
        setCount(count + 1);
        console.log("====", count);
        setTimeout(() => {
            console.log(this);
            console.log("set:", count);
        }, 0);
    };

    //useEffet模拟componentDidmount
    useEffect(() => {
        //每次mount或者update都会调用到这里
        console.log("vvvvv");
    }, []); //为什么 useEffect 第二个参数是空数组，就相当于 ComponentDidMount ，只会执行一次？

    //useEffet模拟componentDidUnmount
    useEffect(() => {
        //只有mount是调用这里
        console.log("ccccc");
        return () => {
            //只有unmount时调用这里    唯一类组件里面没有的功能
            console.log("ddddddd");
        };
    }, [count]); //依赖的数据，中扩里放依赖数据

    const mounted = useRef();
    console.log("=========", mounted.current);
    //useEffet模拟componentDidUpdate
    useEffect(() => {
        console.log("!mounted.current ", !mounted.current);
        if (!mounted.current) {
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            console.log("do componentDidUpdate logic");
        }
    });

    const handleToggle = () => setToggle(!toggle);

    // Hooks之前
    // <Context.Consumer>
    //     { contextValue=> < h1 > { contextValue}</h1>}
    // </Context.Consumer>

    // Hooks之后

    // const ThemeContext = React.createContext({
    //     toggle,
    //     handleToggle
    // });
    // const contextValue = useContext(ThemeContext);
    // console.log("ggggg", contextValue);

    return (
        <div>
            <NouseContext></NouseContext>
            <UseContext></UseContext>
            <h1>
                {count} {name} <br />
            </h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={onClick}>setTimeout</button>
            <input type="text" onInput={changeInput}></input>
            {/*3*/}
            <UserContext.Provider value={{ toggle, handleToggle }}>
                <Switcher
                // toggleState={toggle}
                // handleToggle={handleToggle}
                ></Switcher>
            </UserContext.Provider>
        </div>
    );
};

const Switcher = props => {
    const handleClick = () => {
        props.handleToggle();
    };
    return (
        <Panel
        // toggleState={props.toggleState}
        // handleClick={handleClick}
        ></Panel>
    );
};
//🌰🎁
const Panel = props => {
    // const handleClick = () => {
    //     props.handleClick();
    // };
    const { toggle, handleToggle } = useContext(UserContext); // 4
    // return <div onClick={handleClick}>{props.toggleState ? "✅" : "✖️"}</div>;
    return <div onClick={handleToggle}>{toggle ? "✅" : "✖️"}</div>;
};

export default Counter;
