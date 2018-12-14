import React from 'react';

export default class SubItem extends React.Component {
  render() {
    const { display, name, icon, children, onClick } = this.props;
    return (
      <div>
        <li
          className="nav-item"
          onClick={onClick}
          role="presentation"
        >
          <a className="nav-link">
            <i className="material-icons">{icon}</i>
            <p>{name}</p>
          </a>
          <b className={`caret ${display ? 'caret-reversed' : ''}`} />
        </li>
        <div className={display ? 'display' : 'hidden'}>
          {children}
        </div>
      </div>
    );
  }
}

