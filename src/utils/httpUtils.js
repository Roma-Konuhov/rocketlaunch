import { get, find, isEmpty } from 'lodash';

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

  return rocketWikiUrl;
};