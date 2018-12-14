import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import { LayoutWrapper } from "./Layout.style";
import Footer from "./Footer";
import routes from "../App/routes";
import ItemRoute from "./ItemRoute";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keysOpen: [],
      email: "Super Admin",
      collapse: false
    };
  }

  async componentWillMount() {
    this.collapseMenuIfIsMobile();
  }

  collapseMenu = () => {
    this.setState({
      collapse: true
    });
  };

  unCollapseMenu = () => {
    this.setState({
      collapse: false
    });
  };

  collapseMenuIfIsMobile = () => {
    if (window.innerWidth < 768) {
      this.collapseMenu();
    }
  };

  checkKeyOpen(key) {
    const { keysOpen } = this.state;
    return keysOpen.includes(key);
  }

  changeStatusKey(key) {
    const { keysOpen } = this.state;
    const index = keysOpen.indexOf(key);
    if (index > -1) {
      keysOpen.splice(index, 1);
    } else {
      keysOpen.push(key);
    }
    this.setState({
      keysOpen
    });
  }

  render() {
    const { collapse } = this.state;
    const { children } = this.props;
    return (
      <LayoutWrapper collapse={collapse}>
        <div className="wrapper">
          <div
            className="sidebar"
            data-color="azure"
            data-background-color="white"
            data-image="../assets/img/sidebar-1.jpg"
          >
            <div className="logo">
              <Link to={routes.dashboard} className="simple-text logo-normal">
                BOOK GRANT PERMISSON
              </Link>
            </div>
            <div className="sidebar-wrapper">
              <ul className="nav">
                <ItemRoute
                  route={routes.dashboard}
                  icon="apps"
                  name="Dashboard"
                  handleChangeRoute={this.collapseMenuIfIsMobile}
                />
                <ItemRoute
                  route={routes.user}
                  icon="person"
                  name="User"
                  handleChangeRoute={this.collapseMenuIfIsMobile}
                />
                <ItemRoute
                  route={routes.role}
                  icon="security"
                  name="Role"
                  handleChangeRoute={this.collapseMenuIfIsMobile}
                />
                <ItemRoute
                  route={routes.page}
                  icon="local_library"
                  name="Page"
                  handleChangeRoute={this.collapseMenuIfIsMobile}
                />
                <ItemRoute
                  route={routes.feature}
                  icon="grade"
                  name="Feature"
                  handleChangeRoute={this.collapseMenuIfIsMobile}
                />
              </ul>
            </div>
          </div>
          <div
            className="header"
            style={{
              borderBottom: "1px solid #E7E7E7"
            }}
          >
            <Header email={this.state.email} />
            {collapse ? (
              <Icon
                className="menu-unfold"
                type="menu-unfold"
                onClick={this.unCollapseMenu}
              />
            ) : (
              <Icon
                className="menu-fold"
                type="menu-fold"
                onClick={this.collapseMenu}
              />
            )}
          </div>
          <div className="content">{children}</div>
          <div
            className="footer"
            style={{
              borderTop: "1px solid #E7E7E7"
            }}
          >
            <Footer />
          </div>
        </div>
      </LayoutWrapper>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default withRouter(Layout);
