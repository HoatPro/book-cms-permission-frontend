import axios from 'axios';
import config from '../../config';

export async function getFeatures() {
  try {
    const options = {
      method: 'GET',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/features`,
      withCredentials: true
    };
    const {
      status: statusCode,
      data: { status, results: features, error }
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, features, error };
  } catch (error) {
    return { error };
  }
}

export async function getFeature(featureId) {
  try {
    const options = {
      method: 'GET',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/features/${featureId}`,
      withCredentials: true
    };
    const {
      status: statusCode,
      data: { status, results: feature },
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, feature };
  } catch (error) {
    return { error };
  }
}

export async function createFeature({ displayName, frontendKey, backendKey,all }) {
  try {
    const options = {
      method: 'POST',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/features`,
      withCredentials: true,
      data: { displayName, frontendKey, backendKey,all},
    };
    const {
      status: statusCode,
      data: { status, results: feature },
    } = await axios(options);

    if (statusCode !== 200) throw new Error(error.message);
    return { status, feature };
  } catch (error) {
    return { error };
  }
}

export async function updateFeature({ featureId, displayName, frontendKey, backendKey,all}) {
  try {
    const options = {
      method: 'PUT',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/features/${featureId}`,
      withCredentials:true,
      data: { displayName, frontendKey, backendKey,all },
    };
    const {
      status: statusCode,
      data: { status, results: feature },
    } = await axios(options);
    if (statusCode != 200) throw new Error(error.message);
    return { status, feature };
  } catch (error) {
    return { error };
  }
}

export async function deleteFeature(featureId) {
  try {
    const options = {
      method: 'DELETE',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/features/${featureId}`,
      withCredentials: true,
    };
    const {
      status: statusCode,
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status };
  } catch (error) {
    return { error };
  }
}
