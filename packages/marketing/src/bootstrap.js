import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate }) => {
  const history = createMemoryHistory();

  onNavigate && history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname, search: nextSearch }) => {
      if (history.pathname !== nextPathname || history.search !== nextSearch) {
        history.push(nextPathname + nextSearch);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, {});
  }
}

export default mount;
