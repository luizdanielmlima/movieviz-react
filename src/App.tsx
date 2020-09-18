import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../src/store/reducer';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* CSS, Theme variables */
import './theme/styles.css';
import './theme/variables.css';

/* Other */
import Movies from './pages/Movies/Movies';
import Actors from './pages/Actors/Actors';
import Actor from './components/Actor/Actor';

const store = createStore(reducer, applyMiddleware(thunk));

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/movies" component={Movies} exact={true} />
            <Route path="/actors" component={Actors} exact={true} />
            <Route path="/actors/:id" component={Actor} />
            <Route
              path="/"
              render={() => <Redirect to="/movies" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="movies" href="/movies">
              <IonLabel>MOVIES</IonLabel>
            </IonTabButton>
            <IonTabButton tab="actors" href="/actors">
              <IonLabel>ACTORS</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
