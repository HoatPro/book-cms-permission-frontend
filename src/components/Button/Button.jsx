import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './Button.style';

class Button extends React.Component {
  render() {
    const { text, onClick, style, className } = this.props;
    return (
      <ButtonWrapper
        onClick={onClick}
        style={style}
        className={className}
      >
        {text}
      </ButtonWrapper>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
