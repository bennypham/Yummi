import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './Component/Header';
import Login from './Component/Login';
import Home from './Component/Home';
import Signup from './Component/Signup';
import APIRandomRecipe from './Component/APIRandomRecipe';
import APIRecipeId from './Component/APIRecipeId';
import Landing from './Component/Landing';
import RecipePage from './Component/RecipePage';
import Logout from './Component/Logout';
import Profile from './Component/Profile';
import SearchResults from './Component/SearchResults'
import Documentation from './Component/Documentation';
import NotFound from './Component/NotFound.js';
import HealthyDiet from './Component/HealthyDiet';


import { withAuthentication } from './Session';

class App extends Component {

  render(){
    return (
      <React.Fragment>
          <Router>
            <Header />
            <div className="Routes">
              <Switch>
                <Route exact path={'/'} component={Landing} />
                <Route path={'/login'} component={Login} />
                <Route path={'/signup'} component={Signup} />
                <Route path={'/api/get-random'} component={APIRandomRecipe} />
                <Route path={'/api/recipe/:recipeId'} component={APIRecipeId} />
                <Route path={'/home'} component={Home} />
                <Route path={'/profile/:profileId'} component={Profile} />
                <Route path={'/logout'} component={Logout} />
                <Route path={'/recipe/:recipeId'} component={RecipePage} />
                <Route path={'/search/:query'} component={SearchResults} />
                <Route path={'/documentation'} component={Documentation} />
                <Route path={'/healthydiet'} component={HealthyDiet} />

                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </Router>
      </React.Fragment>
    )
  }

}

export default withAuthentication(App);
