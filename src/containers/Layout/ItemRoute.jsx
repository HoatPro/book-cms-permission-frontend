import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class ItemRoute extends React.Component {
  checkActive = (route) => {
    const currentRoute = `/${this.props.location.pathname.split('/').slice(1, 3).join('/')}`;
    if (route === currentRoute) {
      return true;
    }
    return false;
  }

  render() {
    const { route, icon, name, subtitle } = this.props;
    return (
      <li
        className={`nav-item ${this.checkActive(route) ? 'active' : ''}`}
        onClick={this.props.handleChangeRoute}
        role="presentation"
      >
        <Link className="nav-link" to={route}>
          <i className="material-icons">{icon}</i>
          <i className="subtitle">{subtitle}</i>
          <p>{name}</p>
        </Link>
      </li>
    );
  }
}

ItemRoute.defaultProps = {
  icon: '',
  subtitle: '',
};

ItemRoute.propTypes = {
  route: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  handleChangeRoute: PropTypes.func.isRequired,
};

export default withRouter(ItemRoute);
