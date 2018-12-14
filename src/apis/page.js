import axios from 'axios';
import config from '../../config';

export async function getPages() {
  try {
    const options = {
      method: 'GET',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/pages`,
      withCredentials: true,
    };
    const {
      status: statusCode,
      data: { status, results: pages, error }
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, pages, error };
  } catch (error) {
    return { error };
  }
}

export async function getPage(pageId) {
  try {
    const options = {
      method: 'GET',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/pages/${pageId}`,
      withCredentials: true,
    };
    const {
      status: statusCode,
      data: { status, results: page },
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, page };
  } catch (error) {
    return { error };
  }
}

export async function createPage({ keyName, displayName, featureIds }) {
  try {
    const options = {
      method: 'POST',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/pages`,
      data: { keyName, displayName, featureIds },
      withCredentials: true,
    };
    const {
      status: statusCode,
      data: { status, results: page },
    } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status, page };
  } catch (error) {
    return { error };
  }
}

export async function updatePage({ pageId, keyName, featureIds, displayName }) {
  try {
    const options = {
      method: 'PUT',
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/pages/${pageId}`,
      data: { key:keyName, featureIds, displayName },
      withCredentials: true,
    };
    const {
      status: statusCode,
      data: { status, results: page },
    } = await axios(options);
    if (statusCode != 200) throw new Error(error.message);
    return { status, page };
  } catch (error) {
    return { error };
  }
}

export async function deletePage(pageId) {
  try {
    const options = {
      method: "DELETE",
      url: `${config.domains.BOOK_GRANY_PERMISSION}/api/v1/pages/${pageId}`,
      withCredentials: true
    };
    const { status: statusCode } = await axios(options);
    if (statusCode !== 200) throw new Error(error.message);
    return { status };
  } catch (error) {
    return { error };
  }
}
