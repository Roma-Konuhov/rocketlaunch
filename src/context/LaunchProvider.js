import React from 'react';

import { fetchLaunches } from '../api/launches';
import DataProviderFactory from './DataProviderFactory';
import initialValues from './initialValues';

//       "id": 2036,
//       "name": "Electron | Don't Stop Me Now",
//       "net": "June 11, 2020 04:43:00 UTC",
//       "netstamp": 1592023380,
//       "status": 1,
//       "infoURLs": [],
//       "infoURL": null,
//       "lsp": {
//           "id": 23,
//           "name": "Rocket Lab Ltd",
//           "countryCode": "USA",
//       },
//       "missions": [
//         {
//            "id": 21,
//            "wikiURL": "",
//         }
//       ],
//       "rocket": {
//          "id": 731,
//          "wikiURL": "https://en.wikipedia.org/wiki/Falcon_9_Full_Thrust#Block_5",
//          "imageSizes": [320, 480, 1920],
//          "imageURL": "https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Falcon9Block5.jpg_1920.jpg"
//       }

export const LaunchContext = React.createContext(initialValues);

export const LaunchProvider = DataProviderFactory({
  fetchFn: fetchLaunches,
  context: LaunchContext,
  dataPath: 'launches',
});

export const LaunchConsumer = LaunchContext.Consumer;
