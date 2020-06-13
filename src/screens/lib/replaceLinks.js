const url = {
  instagram: 'instagram.com',
  facebook: 'facebook.com',
  twitter: 'twitter.com',
  linkedin: 'linkedin.com/in',
  link: '',
  youtube: '',
};

export const replaceLink = (link, social) => {
  if (link) {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return `//${link.split('//')[1]}`;
    }
    if (link.startsWith('@')) {
      return `//${url[social]}/${link.split('@')[1]}`;
    }
    return `//${url[social]}/${link}`;
  }
  return link;
};
