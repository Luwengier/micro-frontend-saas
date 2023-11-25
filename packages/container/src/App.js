import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Header from './components/Header';
import Progress from './components/Progress';

const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />

          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>

              <Route path="/dashboard">
                {/* 課程以這種方式保護需要登入的路由，但其實會在被轉址回首頁後按下上一頁時造成無限迴圈 */}
                {!isSignedIn && <Redirect to="/" replace />}
                <DashboardApp />
              </Route>

              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};

export default App;
