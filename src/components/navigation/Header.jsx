import React from "react";
import { Link } from 'gatsby'
import logo from "../../assets/images/logo.svg"

const Header = props => {
  return (
    <nav className={`navbar`}>
      <div className="logo">
        <Link to={'/'} className="display-flex"><img src={logo} alt="BMW Foundation | Herbert Quant" /></Link>
      </div>
    </nav>
  );
}

export default Header;
