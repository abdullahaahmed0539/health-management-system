import "./navbar.scss";
import menuIcon from "./menu.png";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="left">
        <a href="/">Home</a>
        <a href="/">Search</a>
      </div>
      <div className="right">
        <a href="/">Login</a>
        <a href="/">Signup</a>
        <div className="menuIcon">
          <img src={menuIcon} alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">Search</a>
          <a href="/">Login</a>
          <a href="/">Signup</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
