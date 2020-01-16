import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import RecipeCard from './RecipeCard'
import Filter from './Filter';
var request = require('request');

const mealtypes = ["Breakfast", "Brunch", "Lunch", "Supper", "Dinner", "Snack"];

const diets = [
  "Vegitarian",
  "Vegan",
  "Mediterranean",
  "Pescatarian",
  "Ketogenic",
  "Raw Food",
  "Carnivore",
];

const allergies = [
  "Peanuts",
  "Soybean",
  "Egg",
  "Milk",
  "Fish",
  "Gluten",
];

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hits: [], 
      loading: true,
      filteredHits: [],
      mealTypeselected: [], dietTypeselected: [], allergyTypeselected: []
    }
  }

  componentDidMount() {
    this.setState({ 
        hits: [],
        filteredHits: []
     }, () => this.query())
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query){

        this.setState({ 
            loading: true,
            hits: [],
            filteredHits: []
         }, () => this.query())
    }
  }

  query() {
    var query = this.props.match.params.query
    this.props.firebase.saveSearch(query)
     //make query
     var options = {
        method: 'POST',
        uri: 'https://sheltered-brook-11886.herokuapp.com/http://34.94.0.82//elasticsearch/recipes/_doc/_search',
        auth: {
            username: process.env.REACT_APP_ELASTIC_USER,
            password: process.env.REACT_APP_ELASTIC_PASS
        },
        body: {
            "query": {
                "multi_match" : {
                    "query":    query, 
                    "fields": [ "title", "mealTypes", "dietTypes", "allergyTypes","extendedIngredients","ingredients","instructions" ] 
                  }
            }
          },
        json: true,
        
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          if (body.hits.hits.length < 1) {
            this.setState({ 
              loading: false
           })
          }
          else {
            var database = this.props.firebase.database
            for(let i=0; i < body.hits.hits.length; i++){
                database.ref('/recipes/' + body.hits.hits[i]._id).once('value').then(function(snapshot) {
                  var r = snapshot.val()
                  if (r) {
                    this.setState({ 
                      loading: false,
                      hits: [...this.state.hits, snapshot.val()],
                      filteredHits: [...this.state.filteredHits, snapshot.val()]
                   })
                  }
                }.bind(this));
                
            }
          }
        }
        else console.log(error)
    }.bind(this));  
  }

  filterRecipes() {
    var filteredHits = this.state.hits
    if(this.state.mealTypeselected.length > 0 ) {
        filteredHits = filteredHits.filter(function(item){
            if (item.mealTypes) {
                for(var i = 0; i < item.mealTypes.length; i++) {
                    if (this.state.mealTypeselected.includes(item.mealTypes[i])){
                        return item
                    }
                }
            }
        }.bind(this))
    }
    if(this.state.dietTypeselected.length > 0 ) {
        filteredHits = filteredHits.filter(function(item){
            if (item.dietTypes) {
                for(var i = 0; i < item.dietTypes.length; i++) {
                    if (this.state.dietTypeselected.includes(item.dietTypes[i])){
                        return item
                    }
                }
            }
        }.bind(this))
    }
    if(this.state.allergyTypeselected.length > 0 ) {
        filteredHits = filteredHits.filter(function(item){
            if (item.allergyTypes) {
                for(var i = 0; i < item.allergyTypes.length; i++) {
                    if (!this.state.allergyTypeselected.includes(item.allergyTypes[i])){
                        return item
                    }
                }
            }
            if (!item.allergyTypes || item.allergyTypes.length < 1) return item
        }.bind(this))
    }

    this.setState({filteredHits: filteredHits})
  }

selectionHandler = (childData, key) => {
  if (key === 0) {
    this.setState({mealTypeselected: childData},
      () => this.filterRecipes()
      )
  }
  else if (key === 1) {
    this.setState({dietTypeselected: childData},
      () => this.filterRecipes()
      )
  }
  else if (key === 2) {
    this.setState({allergyTypeselected: childData},
    () => this.filterRecipes()
    )
  }

}

render() {
    return (
          <div>

            <ul className="filter">
              <li>  <Filter names = {mealtypes} title = {"Meal Types"} parentSelected = {this.selectionHandler} index = {0}/> </li>
              <li> <Filter names = {diets} title = {"Diets"} parentSelected = {this.selectionHandler} index = {1}/> </li>
              <li> <Filter names = {allergies} title = {"Allergies"} parentSelected = {this.selectionHandler} index = {2}/> </li>
            </ul>
                {this.state.filteredHits.length>0?
                <div>
                  <h3 style={{paddingLeft: '16px'}}>Recipes matching {this.props.match.params.query}:</h3>
                  {this.state.filteredHits.map((item, i) => 
                    <RecipeCard key={i} recipe={item} firebase={this.props.firebase}/>
                  )}
                </div>
                :
              <div>
                <br/>
                <br/>
                <h2 align="center">{this.state.loading?"Loading...":"No recipes match this criteria"}</h2>
              </div>
              }
          </div>
    );
  }
}

export default withRouter(withFirebase(SearchResults));