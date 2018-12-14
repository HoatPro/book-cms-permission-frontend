import styled from 'styled-components';

const FeatureWrapper = styled.div`
  .secondary-wrapper {
    background: #FFF;
    padding: 10px;
    overflow: auto;
    border-radius: 5px;
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
    table {
      * {
        word-break: normal;
      }
      .action {
        text-align: center;
      }
    }
  }
`;

const FeatureModalWrapper = styled.div`
  section {
    margin-bottom: 10px;
    > label {
      font-weight: 600;
    }
  }

  input {
    width: 100%;
  }
`;

export {
  FeatureWrapper,
  FeatureModalWrapper,
};
