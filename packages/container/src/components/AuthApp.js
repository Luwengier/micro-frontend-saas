import React, { useEffect, useRef } from 'react';
import mount from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname, search: nextSearch }) => {
        const { pathname, search } = history.location;

        if (pathname !== nextPathname || search !== nextSearch) {
          history.push(nextPathname + nextSearch);
        }
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, [history]);

  return <div ref={ref} />;
};

export default AuthApp;
