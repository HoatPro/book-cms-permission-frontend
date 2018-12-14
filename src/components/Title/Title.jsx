import React from 'react';
import PropTypes from 'prop-types';
import { TitleWrapper } from './Title.style';

class Title extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <TitleWrapper>{title}</TitleWrapper>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
