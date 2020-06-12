import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewPage = ({ route }) => {
  if (!route || !route.params) {
    return null;
  }

  return (
    <WebView
      source={{ uri: route.params.url }}
      style={{ marginTop: 20 }}
    />
  );
};

export default WebViewPage;