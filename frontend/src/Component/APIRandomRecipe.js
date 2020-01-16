import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const APIRandomRecipe = () => (
  <div>
    <APIRandomRecipeConst />
  </div>
);

class APIRandomRecipeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: false
    }
  }
  
  redirect = () => {
    window.location.href = 'http://localhost:5000/api/get_random';
    // maybe can add spinner while loading
    return null;
  }

  render() {
    return (
      <Switch> 
        <Route exact path='/api/get-random' render={() => 
          this.redirect()
        } />
      </Switch>
    );
  }
}

const APIRandomRecipeConst = withRouter(withFirebase(APIRandomRecipeComponent));
export default APIRandomRecipe;
