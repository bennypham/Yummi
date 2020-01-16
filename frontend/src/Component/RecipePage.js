import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Recipe from './Recipe'

const RecipePage = () => (
  <div>
    <RecipePageConst />
  </div>
);

class RecipePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: false
    }
  }
  componentDidMount() {
    var id = this.props.match.params.recipeId
    // random recipe
    if (id === "random") {
      var options = {
        method: "GET",
        uri: "http://localhost:5000/api/get_random"
      }

      fetch(options.uri).then((response) => {
        response.json().then((data) => {
          this.setState({
            recipe: data,
            loading: false
          })
        })
      })
    } else {
      var reciperef = this.props.firebase.database.ref('recipes/' + id);
      reciperef.once('value').then(function(snapshot) {
        this.setState({recipe:  snapshot.val()})
      }.bind(this));
    }
  }

  render() {
    return (
      <div>
        {this.state.recipe?
        <div>
        <Recipe recipe={this.state.recipe} firebase={this.props.firebase} topClassName={"full-screen"} />

        </div>
        :
        <p>Uh-oh! This recipe doesn't exist.</p>}
      </div>

    );
  }
}

const RecipePageConst = withRouter(withFirebase(RecipePageComponent));
export default RecipePage;
