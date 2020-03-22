export const HASHMAP_UPDATE = '@hashmap/UPDATE';
export const HASHMAP_RESET = '@hashmap/RESET';
export const HASHMAP_TITLE_UPDATE = '@hashmap/title/UPDATE';
export const HASHMAP_SUBTITLE_UPDATE = '@hashmap/subtitle/UPDATE';
export const HASHMAP_DESCRIPTION_UPDATE = '@hashmap/description/UPDATE';
export const HASHMAP_CREATE_POST = '@hashmap/post/CREATE';
export const HASHMAP_DELETE_POST = '@hashmap/post/DELETE';
export const HASHMAP_POST_TITLE_UPDATE = '@hashmap/post/title/UPDATE';
export const HASHMAP_POST_SUBTITLE_UPDATE = '@hashmap/post/subtitle/UPDATE';

export const hashmapUpdate = data => ({
  type: HASHMAP_UPDATE,
  data,
});

export const hashmapReset = () => ({
  type: HASHMAP_RESET,
});

export const titleUpdate = text => ({
  type: HASHMAP_TITLE_UPDATE,
  text,
});

export const subtitleUpdate = text => ({
  type: HASHMAP_SUBTITLE_UPDATE,
  text,
});

export const descriptionUpdate = text => ({
  type: HASHMAP_DESCRIPTION_UPDATE,
  text,
});

export const postCreate = () => ({
  type: HASHMAP_CREATE_POST,
  post: { title: '', description: '' },
});

export const postDelete = index => ({
  type: HASHMAP_DELETE_POST,
  index,
});

export const titlePostUpdate = (text, idPost) => ({
  type: HASHMAP_POST_TITLE_UPDATE,
  text,
  idPost,
});

export const subtitlePostUpdate = (text, idPost) => ({
  type: HASHMAP_POST_SUBTITLE_UPDATE,
  text,
  idPost,
});
