import styled from 'styled-components';
import config from '../../../config';

const ButtonWrapper = styled.button`
  border-radius: 3px;
  cursor: pointer;
  border: none;
  outline: none;
  background: ${config.colors.primary_blue};
  color: #FFF;
  margin-bottom: 5px;
  height:30px;
  width:100px;

  &:hover {
    background: rgba(0,188,212, 0.8);
  }
`;

export { ButtonWrapper };
