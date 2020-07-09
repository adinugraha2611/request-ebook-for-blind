import React from 'react';
class NavBar extends React.Component {
  handleNavContent = () => {
    return this.props.isSignedIn ? (
      <React.Fragment>
        <li>
          <a href="/mylist" onClick={this.props.userReqList}>
            List Request Saya
          </a>
        </li>
        <li>
          <a href="!%" onClick={this.handleNav}>
            Sign Out{' '}
          </a>
        </li>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <li>
          <a href="!#" onClick={this.handleNav}>
            Register
          </a>
        </li>
        <li>
          <a href="/signin" onClick={this.handleNav}>
            Sign in
          </a>
        </li>
      </React.Fragment>
    );
  };
  handleNav = (e) => {
    e.preventDefault();
    const component = e.target.innerText;
    this.props.showPopup(component);
  };

  render() {
    const navContent = this.handleNavContent();
    return (
      <React.Fragment>
        <nav>
          <span>
            {this.props.isSignedIn
              ? `Anda Log in dengan akun ${this.props.signedInUser}`
              : 'Selamat datang!'}{' '}
          </span>
          <span className="important">
            {!!this.props.role ? `sebagai ${this.props.role}` : null}
          </span>
          <ul>{navContent}</ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
