import React from 'react';
import { WebView } from 'react-native-webview';

import EmptyPage from '../../components/EmptyPage';

const WebViewPage = ({ route }) => {
  if (!route || !route.params) {
    return <EmptyPage />;
  }

  return (
    <WebView source={{ uri: route.params.url }} />
  );
};

export default WebViewPage;