import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from 'app/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import '../styles/index.css';

// eslint-disable-next-line
const MyApp = ({ Component, pageProps, store }) => {
  // eslint-disable-next-line
  return (
    <Provider store={store}>
      {/* eslint-disable-next-line */}
      <Component {...pageProps} />
    </Provider>
  );
};

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
