import styled from 'styled-components';

const HeaderControllerWrapper = styled.div`
    width: 100%;
    clear: both;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > h3 {
      float: left;
      margin-top: 6px;
      margin-left: 10px;
      font-weight: 300;
      /* @media only screen and (max-width: 768px) {
        font-size: 1rem;
      } */
    }
    .control {
      display: flex;
      justify-content: flex-start;
    }
    .select-overview, .rangepicker-overview {
      margin-left: 10px;
      z-index: 100;
    }
    .rangepicker-overview {
      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
`;

export { HeaderControllerWrapper };
