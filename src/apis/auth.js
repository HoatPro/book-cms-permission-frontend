import axios from 'axios';
import config from '../../config';

export async function loginRequestApi(email, password) {
  try {
    const options = {
      method: 'POST',
      url: `${config.VBEE_LOGS_SERVER}/api/v2/auths/admin/login`,
      data: {
        email,
        password,
      },
    };
    const {
      status: statusCode,
      data: {
        results: {
          accessToken,
        },
      },
    } = await axios(options);
    if (statusCode !== 200) throw new Error();
    else {
      return {
        accessToken,
      };
    }
  } catch (error) {
    return { error };
  }
}

export async function verifyToken(accessToken) {
  try {
    const options = {
      method: 'GET',
      url: `${config.VBEE_LOGS_SERVER}/api/v2/auths/token/verify`,
      headers: { Authorization: accessToken },
    };
    const {
      status: statusCode,
      data: {
        email,
      },
    } = await axios(options);
    if (statusCode !== 200) throw new Error();
    else {
      return {
        status: 1,
        email,
      };
    }
  } catch (error) {
    return { error };
  }
}
