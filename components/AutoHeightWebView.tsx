import React, {useCallback, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

export const {width} = Dimensions.get('screen');

interface Props {
  html: string;
  scrollEnabled?: boolean;
}

function AutoHeightWebView({html, scrollEnabled}: Props) {
  const webviewRef = useRef<WebView>(null);

  const [height, setHeight] = useState(0);

  const onWebViewLoad = useCallback(async () => {
    webviewRef.current?.injectJavaScript(`(() => {
        window.ReactNativeWebView.postMessage(document.body.scrollHeight / document.body.scrollWidth);
    })();`);
  }, []);

  const onWebViewMessage = useCallback((e: WebViewMessageEvent) => {
    setHeight(width * Number(e.nativeEvent.data));
  }, []);

  return (
    <WebView
      ref={webviewRef}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{opacity: 0.99, width, height, maxHeight: 4000}}
      nestedScrollEnabled={scrollEnabled}
      source={{html}}
      scrollEnabled={scrollEnabled}
      onLoadEnd={onWebViewLoad}
      onMessage={onWebViewMessage}
    />
  );
}

export default AutoHeightWebView;
