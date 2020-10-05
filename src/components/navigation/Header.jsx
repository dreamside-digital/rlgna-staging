import React from "react";
import ReactDOM from 'react-dom';
import { Link } from 'gatsby'
import { connect } from "react-redux";
import logo from "../../assets/images/logo.svg"

const mapStateToProps = state => {
  return {
    accessGranted: state.adminTools.accessGranted,
  };
};

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false
    }
  }

  componentDidMount() {
    this.appRoot = document.querySelector('.nl-page');
    this.container = document.createElement('div');
    this.appRoot.appendChild(this.container);
  }

  handleClick = (e) => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    this.setState({ menuIsOpen: false })
  }

  toggleMenu = (e) => {
    e.preventDefault();
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  menu = () => {
    return (
      <div className={`menu ${this.state.menuIsOpen ? 'is-active' : ''}`}>
        <a className='menu-item' href="#intro" onClick={this.handleClick}>Introduction</a>
        <a className='menu-item' href="#program-elements" onClick={this.handleClick}>Program Elements</a>
        <a className='menu-item' href="#logistics" onClick={this.handleClick}>Virtual Logistics</a>
        <a className='menu-item' href="#open-space-week" onClick={this.handleClick}>Schedule</a>
        <a className='menu-item' href="#gallery" onClick={this.handleClick}>ICYMI</a>
        <a className='menu-item' href="#social" onClick={this.handleClick}>Social media</a>
      </div>
    )
  }

  render() {
    return (
      <nav className={`navbar`}>
        <div className="logo">
          <Link to={'/'} className="display-flex"><img src={logo} alt="BMW Foundation | Herbert Quant"/></Link>
        </div>
        {
          this.props.accessGranted &&
          <React.Fragment>
          <div className='navbar-items'>
            <a className='navbar-item menu-item' href="#menu" onClick={this.toggleMenu}>Menu</a>
            <a className='navbar-item' href="#intro" onClick={this.handleClick}>Introduction</a>
            <a className='navbar-item' href="#program-elements" onClick={this.handleClick}>Program Elements</a>
            <a className='navbar-item' href="#logistics" onClick={this.handleClick}>Virtual Logistics</a>
            <a className='navbar-item' href="#open-space-week" onClick={this.handleClick}>Schedule</a>
            <a className='navbar-item' href="#gallery" onClick={this.handleClick}>ICYMI</a>
            <a className='navbar-item' href="#social" onClick={this.handleClick}>Social media</a>
          </div>
          {
            this.container && ReactDOM.createPortal(this.menu(), this.container)
          }
          </React.Fragment>
        }
      </nav>
    );
  }
}

export default connect(mapStateToProps)(Header);
