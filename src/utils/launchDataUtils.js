import moment from 'moment';
import countries from 'i18n-iso-countries';
import { get, find, isEmpty, isObject } from 'lodash';

/**
 * Tries to get info URL from root level of the item
 * if it's empty then from `missions` sub object
 * if it's empty then from `rocket` sub object
 *
 * @param item {Object}
 * @returns {string}
 */
export const getInfoUrl = (item = {}) => {
  const infoURL = get(item, 'infoURL');
  if (infoURL) {
    return infoURL;
  }

  const infoUrls = get(item, 'infoURLs');
  if (!isEmpty(infoUrls)) {
    return infoUrls[0];
  }

  if (item.missions) {
    const mission = find(item.missions, mission => mission.wikiURL);
    if (mission) {
      return mission.wikiURL;
    }
  }

  const rocketWikiUrl = get(item, 'rocket.wikiURL');

  return rocketWikiUrl || '';
};

/**
 * Tries to get image URL for smallest image which is allowed(based on imageSizes array)
 * If it's empty then returns static placeholder image from assets
 *
 * @param item {Object}
 * @returns {{uri: string} || <File reference>}
 */
export const getImageUrl = item => {
  const imageSizes  = get(item, 'rocket.imageSizes');
  let imageUrl = get(item, 'rocket.imageURL');
  const httpRe = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', 'i');

  if (!isEmpty(imageSizes) && httpRe.test(imageUrl)) {
    const minImageSize = Math.min(...imageSizes);
    const maxImageSize = Math.max(...imageSizes);

    // regexp looks for the entrance of the big image filename like <filename>.<ext>_<maxsize>.<ext>
    // e.g.: https://digitaloceanspaces.com/RocketImages/Falcon9Block5.jpg_1920.jpg
    const re = new RegExp(`\\.(\\w{3,4})_${maxImageSize}\\.(\\w{3,4})$`, 'i');

    // and replaces it with small image filename: <filename>.<ext>_<minsize>.<ext>
    imageUrl = imageUrl.replace(re, `.$1_${minImageSize}.$2`);
  }

  // check imageUrl one more time after possible replacement
  if (!httpRe.test(imageUrl)) {
    return require('./assets/placeholder.png');
  }

  return { uri: imageUrl };
};

/**
 * Returns description of a launch's status
 *
 * @param item {Object}
 * @param statusData {Object}
 * @returns {string}
 */
export const getStatus = (item, statusData) => {
  const status = find(statusData, { id: item.status});

  if (!isObject(status)) {
    return '';
  }

  return status.description;
};

/**
 * Format date
 *
 * @param item {Object}
 * @returns {string}
 */
export const getLaunchDate = item => {
  if (!item.net) {
    return 'No date';
  }
  return moment(item.net, 'MMMM D, YYYY HH:mm:ss').format('MMM D, YYYY');
};

/**
 * Returns URL for 3rd party service www.countryflags.io
 * which provides flag images. But this service requires 2-alpha
 * country codes.
 *
 * Since item contains 3-alpha code country this function makes conversion
 * 3-alpha country code to a 2-alpha code
 *
 * @param item
 * @returns {string}
 */
export const getCountryFlagUrl = item => {
  const cc3alpha = get(item, 'lsp.countryCode');
  const cc2alpha = countries.alpha3ToAlpha2(cc3alpha);

  if (!cc2alpha) {
    return '';
  }

  return `https://www.countryflags.io/${cc2alpha}/flat/24.png`
};