import * as ACTIONS from '../constants/hashmapConstants';

export const hashmapUpdate = data => ({
  type: ACTIONS.HASHMAP_UPDATE,
  data,
});

export const hashmapReset = () => ({
  type: ACTIONS.HASHMAP_RESET,
});

export const titleUpdate = text => ({
  type: ACTIONS.HASHMAP_TITLE_UPDATE,
  text,
});

export const subtitleUpdate = text => ({
  type: ACTIONS.HASHMAP_SUBTITLE_UPDATE,
  text,
});

export const descriptionUpdate = text => ({
  type: ACTIONS.HASHMAP_DESCRIPTION_UPDATE,
  text,
});

export const imgHashmapUpdate = (path, url) => ({
  type: ACTIONS.HASHMAP_IMAGE_UPDATE,
  path,
  url,
});

export const postCreate = postKey => ({
  type: ACTIONS.HASHMAP_CREATE_POST,
  post: { key: postKey, content: '' },
});

export const postDelete = key => ({
  type: ACTIONS.HASHMAP_DELETE_POST,
  key,
});

export const titlePostUpdate = (text, key) => ({
  type: ACTIONS.HASHMAP_POST_TITLE_UPDATE,
  text,
  key,
});

export const dataPostUpdate = (data, key) => ({
  type: ACTIONS.HASHMAP_POST_DATA_UPDATE,
  data,
  key,
});
