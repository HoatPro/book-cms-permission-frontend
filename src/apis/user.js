import axios from 'axios';
import config from '../../config';

export async function fetchRandomUsers(amount) {
  try {
    const {
      status: statusCode,
      data: { results: users } } = await axios.get(`https://randomuser.me/api/?results=${amount}`);
    if (statusCode !== 200) throw new Error();
    else {
      return { users };
    }
  } catch (error) {
    return { error };
  }
}

export async function getUsers() {
  try {
    const options = {
      method: 'GET',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/users/admin?size=100`,
      withCredentials: true
    };
    const {
      status: statusCode,
      data: { status, results: users, error }
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, users, error };
  } catch (error) {
    return { error };
  }
}

export async function getUser(userId) {
  try {
    const options = {
      method: "GET",
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/users/admin/${userId}`,
      withCredentials: true
    };
    const {
      status: statusCode,
      data: { status, results: user },
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, user };
  } catch (error) {
    return { error };
  }
}

export async function createUser({ email, ownerBy, roleIds }) {
  try {
    const options = { method: "POST", url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/users/admin`, data: { email, ownerBy,roleIds } };
    const {
      status: statusCode,
      data: { status, results: user },
    } = await axios(options);
    if (statusCode != 200) throw new Error(error.message);
    return { status, user };
  } catch (error) {
    return { error };
  }
}

export async function findUser(keyword) {
  try {
    const options = {
      method: "GET",
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/users/admin?keyword=${keyword}`,
      withCredentials: true
    };
    const {
      status: statusCode,
      data: { status, results: users },
    } = await axios(options);
    if (statusCode != 200) throw new Error(error.message);
    return { status, users };
  } catch (error) {
    return { error };
  }
}