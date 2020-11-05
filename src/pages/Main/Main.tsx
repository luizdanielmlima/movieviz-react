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

import Movies from '../Movies/Movies';
import MovieDetail from '../MovieDetail/MovieDetail';
import Actors from '../Actors/Actors';
import ActorDetail from '../ActorDetail/ActorDetail';
import Watchlist from '../Watchlist/Watchlist';

function Main() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/main/movies" component={Movies} exact={true} />
              <Route path="/main/movies/:id" component={MovieDetail} />
              <Route path="/main/actors" component={Actors} exact={true} />
              <Route path="/main/actors/:id" component={ActorDetail} />
              <Route path="/main/watchlist" component={Watchlist} />
              <Route
                path="/main"
                render={() => <Redirect to="/main/movies" />}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="movies" href="/main/movies">
                <IonLabel>MOVIES</IonLabel>
              </IonTabButton>
              <IonTabButton tab="actors" href="/main/actors">
                <IonLabel>ACTORS</IonLabel>
              </IonTabButton>
              <IonTabButton tab="watchlist" href="/main/watchlist">
                <IonLabel>WATCHLIST</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    )
}

export default Main;
