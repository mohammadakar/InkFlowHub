import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./navbar";
import HeaderRight from "./headerRight";


const Header = () => {

    const [toggle,setToggle] = useState(false);

    return ( 
        <header className="header">
            <HeaderLeft toggle={toggle} setToggle={setToggle}/>
            <Navbar toggle={toggle} setToggle={setToggle}/>
            <HeaderRight />
        </header>
    );
}

export default Header;