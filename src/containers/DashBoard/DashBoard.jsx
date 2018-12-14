import React from 'react';
import { DashBoardWrapper } from './DashBoard.style';
import Title from '../../components/Title/Title';

class DashBoard extends React.Component {
  render() {
    return (
      <DashBoardWrapper>
        <Title title="Dashboard" />
      </DashBoardWrapper>
    );
  }
}

export default DashBoard;
