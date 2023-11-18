import React, { useEffect, useRef } from 'react';
import mount from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname, search: nextSearch }) => {
        const { pathname, search } = history.location;

        if (pathname !== nextPathname || search !== nextSearch) {
          history.push(nextPathname + nextSearch);
        }
      },
    });

    history.listen(onParentNavigate);
  }, [history]);

  return <div ref={ref} />;
};

export default MarketingApp;
