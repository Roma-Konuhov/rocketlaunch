import { get, isEmpty } from 'lodash';

export const getImageUrl = item => {
  const imageSizes  = get(item, 'rocket.imageSizes');
  let imageUrl;

  if (!isEmpty(imageSizes)) {
    const minImageSize = Math.min(...imageSizes);
    const maxImageSize = Math.max(...imageSizes);
    const defaultImageUrl = get(item, 'rocket.imageURL');

    // regexp looks for the entrance of the big image filename like <filename>.<ext>_<maxsize>.<ext>
    // e.g.: https://digitaloceanspaces.com/RocketImages/Falcon9Block5.jpg_1920.jpg
    const re = new RegExp(`\\.(\\w{3,4})_${maxImageSize}\\.(\\w{3,4})$`, 'i');

    // and replaces it with small image filename: <filename>.<ext>_<minsize>.<ext>
    imageUrl = defaultImageUrl.replace(re, `.$1_${minImageSize}.$2`);
  }

  if (!imageUrl) {
    return './assets/placeholder.png';
  }

  return imageUrl;
};