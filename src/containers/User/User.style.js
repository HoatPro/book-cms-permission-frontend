import styled from 'styled-components';

const UserWrapper = styled.div`
  .secondary-wrapper {
    background: #fff;
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
    .search {
      width: 40%;
      margin-left:200px;
      margin-right:140px;
    }
    .button-add {
      margin-right: 20px;
      width: 100px;
      margin-bottom: 10px;
      background-color: #33c9dd;
      color: #ffffff;

    }
  }
`;

const UserModalWrapper = styled.div`
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
  UserWrapper,
  UserModalWrapper,
};
