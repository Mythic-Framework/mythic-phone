import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from 'containers/App';
import WindowListener from 'containers/WindowListener';
import KeyListener from 'containers/KeyListener';

import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <Provider store={store}>
    <KeyListener>
      <WindowListener>
        <App />
      </WindowListener>
    </KeyListener>
  </Provider>,
);
