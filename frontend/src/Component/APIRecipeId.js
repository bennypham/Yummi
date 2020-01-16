import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const APIRecipeId = () => (
  <div>
    <APIRecipeIdConst />
  </div>
);

class APIRecipeIdComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: false
    }
  }
  
  redirect = () => {
    var id = this.props.match.params.recipeId
    window.location.href = 'http://localhost:5000/api/recipe/'+id;
    // maybe can add spinner while loading
    return null;
  }

  render() {
    return (
      <Switch> 
        <Route exact path='/api/recipe/:recipeId' render={() => 
          this.redirect()
        } />
      </Switch>
    );
  }
}

const APIRecipeIdConst = withRouter(withFirebase(APIRecipeIdComponent));
export default APIRecipeId;
