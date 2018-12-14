import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import UserListStyleWrapper from './UserList.style';

export default class UserList extends React.Component {
  render() {
    const { users, loading } = this.props;

    const listUsers = users.map((user, index) => (
      <div key={uuid.v4()}>
        {index < 9 ? `0${index + 1}` : index + 1}
        {'. '}
        {user.email}
      </div>
    ));

    return (
      <UserListStyleWrapper>
        {loading
          ? (
            <h1>
              Loading ...
            </h1>
          ) : listUsers}
      </UserListStyleWrapper>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
