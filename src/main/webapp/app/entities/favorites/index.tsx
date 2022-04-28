import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Favorites from './favorites';
import FavoritesDetail from './favorites-detail';
import FavoritesUpdate from './favorites-update';
import FavoritesDeleteDialog from './favorites-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FavoritesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FavoritesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FavoritesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Favorites} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FavoritesDeleteDialog} />
  </>
);

export default Routes;
