import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Comment from './Comment';
import Ratings from './Ratings';

class Recipe extends Component {

  componentDidMount() {
    var id = this.props.recipe.key
    var reciperef = this.props.firebase.database.ref('recipes/' + id);
    // check if viewcount exist
    reciperef.once('value', function(snapshot) {
      if (snapshot.hasChild('viewcount')) {
        // total views
        reciperef.child('viewcount').once('value', function(snapshot2) {
          var view = snapshot2.val();
          view++;
          reciperef.update({
              "viewcount": view,
          }, function(value) {
            //console.log('completed: ', value)
          })
        })
        // views weekly
        reciperef.child('viewcount_week').once('value', function(snapshot3) {
          var view = snapshot3.val();
          view++;
          reciperef.update({
              "viewcount_week": view
          }, function(value) {
            //console.log('completed: ', value)
          })
        })
      } else {
        // push viewcount field set as 1
        reciperef.update({
            "viewcount": 1,
            "viewcount_week": 1
        }, function(value) {
          //console.log('completed: ', value)
        });
      }
    })
  }

  render() {
    return (
        <Paper  className={this.props.topClassName}>
            <Typography variant="h5" component="h3">
                {this.props.recipe?this.props.recipe.title:"Loading..."}
            </Typography>
            <Typography component="p">
                {!this.props.recipe.avg_rating || this.props.recipe.avg_rating<1?"No Ratings Yet":"Average Rating: "+this.props.recipe.avg_rating.toFixed(2)}
            </Typography>
            <br/>
            {"Ingredients : "}
            <br/>
            {
                this.props.recipe?
                this.props.recipe.extendedIngredients?
                <ul>
                    {this.props.recipe.extendedIngredients.map((item, i) => 
                        <li key={i}>{item.original}</li>
                    )}
                </ul>
                :<ul>
                {this.props.recipe.ingredients.map((item, i) => 
                    <li key={i}>{item}</li>
                )}
            </ul>
                :"Loading..."
            }
            <Typography component="p">
                {"Instructions: "}
                <br/><br/>
                {this.props.recipe?this.props.recipe.instructions:""}
            </Typography>
            {/* 
            <Typography component="p">
                {
                    this.props.recipe?
                    <ul>
                        {this.props.recipe.instructions.map((item, i) => 
                            <li key={i}>{item}</li>
                        )}
                    </ul>:"Loading..."
                }
               
            </Typography> */}
            <br/>
            <Ratings recipe_id = {this.props.recipe.key}/>
            <Comment recipe_id = {this.props.recipe.key}/>
            <br/>
            <h3>Reviews:</h3>
            {this.props.recipe.reviews?
              Object.keys(this.props.recipe.reviews).map((item, i) => 
              <div key={i}>
                <Typography component = "p" key={i}>
                  {this.props.recipe.reviews[item]}
                </Typography>
                <br/>
                <br/>
              </div>
                
            )
            :null}
            
        </Paper>
    );
  }
}

export default Recipe;
