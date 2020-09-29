import React from "react";
import logo from "../../assets/images/logo.svg"

const Header = props => {
  return (
    <nav className={`navbar`}>
      <div className="logo">
        <a href={'/'}><img src={logo} alt="BMW Foundation | Herbert Quant" /></a>
      </div>
    </nav>
  );
}

export default Header;
