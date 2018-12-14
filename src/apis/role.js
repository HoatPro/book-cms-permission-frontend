import axios from 'axios';
import config from '../../config';

export async function getRoles() {
  try {
    const options = {
      method: 'GET',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/roles`,
      withCredentials:true
    };
    const {
      status: statusCode,
      data: { status, results: roles }
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, roles };
  } catch (error) {
    return { error };
  }
}

export async function getRole(roleId) {
  try {
    const options = {
      method: 'GET',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/roles/${roleId}`,
      withCredentials: true
    };
    const {
      status: statusCode,
      data: { status, results: role },
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, role };
  } catch (error) {
    return { error };
  }
}

export async function createRole({ name, featureIds }) {
  try {
    const options = {
      method: 'POST',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/roles`,
      withCredentials: true,
      data: { name, featureIds },
    };
    const {
      status: statusCode,
      data: { status, results: role },
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, role };
  } catch (error) {
    return { error };
  }
}

export async function updateRole({ roleId, featureIds, name }) {
  try {
    const options = {
      method: 'PUT',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/roles/${roleId}`,
      withCredentials: true,
      data: { featureIds, name },
    };
    const {
      status: statusCode,
      data: { status, results: role },
    } = await axios(options);
    if (statusCode != 200) throw new Error(error.message);
    return { status, role };
  } catch (error) {
    return { error };
  }
}
export async function deleteRole(roleId) {
  try {
    const options = {
      method: "DELETE",
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/roles/${roleId}`,
      withCredentials: true
    };
    const { status: statusCode } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status };
  } catch (error) {
    return { error };
  }
}
