import axios from 'axios';

export const loadLink = link => {
  return new Promise((resolve, reject) => {
    const loadData = {};
    if (link.includes('youtube') && link.includes('watch')) {
      let videoId = link.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      const embed = `https://www.youtube.com/embed/${videoId}`;
      loadData.type = 'videoYT';
      loadData.preview = { value: link, embed };
      resolve(loadData);
      return;
    }

    if (link.includes('youtu.be')) {
      const url = link.replace('https://', '').replace('http://', '');
      const videoId = url.split('/')[1];
      const embed = `https://www.youtube.com/embed/${videoId}`;
      loadData.type = 'videoYT';
      loadData.preview = { value: link, embed };
      resolve(loadData);
      return;
    }

    if (link.includes('instagr.am') || link.includes('instagram')) {
      if (link.includes('/p/') || link.includes('/tv/')) {
        loadData.type = 'instragramPostPreview';
        loadData.preview = { value: link };
        resolve(loadData);
        return;
      }
      loadData.type = 'instragramProfilePreview';
      let username = link.split('instagram.com/');
      if (username.length > 0) {
        username = username[1].split('?');
        if (username.length > 0) {
          [username] = username[0].split('/');
        }
      }
      axios
        .get(`https://www.instagram.com/${username}/?__a=1`)
        .then(response => {
          if (response.status === 200) {
            const { user } = response.data.graphql;
            loadData.preview = {
              biography: user.biography,
              fullName: user.full_name,
              isVerified: user.is_verified,
              username: user.username,
              imageUrl: user.profile_pic_url_hd,
              profileUrl: `//instagram.com/${user.username}`,
              value: link,
            };
            resolve(loadData);
          }
        })
        .catch(error => {
          reject(error);
        });
      // console.log(username);
    } else if (link.includes('http://') || link.includes('https://')) {
      axios
        .post('https://us-central1-hashmap-6d623.cloudfunctions.net/scraper', {
          text: link,
        })
        .then(response => {
          loadData.type = 'linksToPreview';
          loadData.preview = response.data;
          resolve(loadData);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      loadData.type = undefined;
      resolve(loadData);
    }
  });
};
