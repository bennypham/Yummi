import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import RecipeCard from './RecipeCard'
import { AuthUserContext } from '../Session';
import './Styles/Home.css'
import Filter from './Filter';
import Modal from '@material-ui/core/Modal';
import Recipe from './Recipe'

// Material-UI Imports
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
class HomeComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                recipes: [], mealTypeselected: [], dietTypeselected: [], allergyTypeselected: [], trendingRecipes: [],
                open: false
            }
    }

    componentDidMount() {
        this.trendingRecipes();
        this.getRecipes();
    }

    trendingRecipes() {
        var avgRatingRecipeRef = this.props.firebase.database.ref('trending_recipes_by_week/');
        avgRatingRecipeRef.limitToFirst(10).on("child_added", function(snapshot) {
            let recipes = this.state.trendingRecipes
            recipes.push(snapshot.val())
            this.setState({trendingRecipes: recipes})
        }.bind(this));}

    getRecipes() {
        var reciperef = this.props.firebase.database.ref('recipes/');
        var recipes = []
        reciperef.orderByChild("avg_rating").limitToFirst(100).on("child_added", function (snapshot) {
            recipes.push(snapshot.val())
            recipes.reverse()

            if (this.state.mealTypeselected.length > 0) {
                recipes = recipes.filter(function (item) {
                    if (item.mealTypes) {
                        for (var i = 0; i < item.mealTypes.length; i++) {
                            if (this.state.mealTypeselected.includes(item.mealTypes[i])) {
                                return item
                            }
                        }
                    }
                }.bind(this))
            }
            if (this.state.dietTypeselected.length > 0) {
                recipes = recipes.filter(function (item) {
                    if (item.dietTypes) {
                        for (var i = 0; i < item.dietTypes.length; i++) {
                            if (this.state.dietTypeselected.includes(item.dietTypes[i])) {
                                return item
                            }
                        }
                    }
                }.bind(this))
            }
            if (this.state.allergyTypeselected.length > 0) {
                recipes = recipes.filter(function (item) {
                    if (item.allergyTypes) {
                        for (var i = 0; i < item.allergyTypes.length; i++) {
                            if (!this.state.allergyTypeselected.includes(item.allergyTypes[i])) {
                                return item
                            }
                        }
                    }
                    if (!item.allergyTypes || item.allergyTypes.length < 1) return item
                }.bind(this))
            }

            this.setState({ recipes: recipes })
        }.bind(this));
    }

    selectionHandler = (childData, key) => {
        if (key === 0) {
            this.setState({ mealTypeselected: childData },
                () => this.getRecipes()
            )
        }
        else if (key === 1) {
            this.setState({ dietTypeselected: childData },
                () => this.getRecipes()
            )
        }
        else if (key === 2) {
            this.setState({ allergyTypeselected: childData },
                () => this.getRecipes()
            )
        }

    }

    text() {
        if (this.state.mealTypeselected.length > 0 ||
            this.state.dietTypeselected.length > 0 ||
            this.state.allergyTypeselected.length > 0)
            return 'No recipes match this criteria'
        else
            return 'Loading...'
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };
    getModalStyle = () => {
        return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }

    render() {

        return (
            <AuthUserContext.Consumer>
                {authUser => authUser ?
                    <div>
                        <div className="root">
                            <div className="gridlist" cols={3.5}>
                                {this.state.trendingRecipes.map((item, i) => (
                                    <GridListTile onClick={() => this.props.history.push('/recipe/' + item.key)} key={i} recipe={item}>
                                        <img src={item.image} /*alt={item.title}*/ />
                                        <GridListTileBar
                                            className="titleBar"
                                            title={item.title}
                                            actionIcon={
                                                <IconButton aria-label={`star ${item.title}`}>
                                                    <StarBorderIcon className="title" />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </div>
                        <ul className="filter">
                            <li>  <Filter names={mealtypes} title={"Meal Types"} parentSelected={this.selectionHandler} index={0} /> </li>
                            <li> <Filter names={diets} title={"Diets"} parentSelected={this.selectionHandler} index={1} /> </li>
                            <li> <Filter names={allergies} title={"Allergies"} parentSelected={this.selectionHandler} index={2} /> </li>
                        </ul>
                        </div>
                    <GridList cellHeight={180} className="gridlistvert">
                        {this.state.recipes.map((item, key) => (
                            <GridListTile onClick={() => this.props.history.push('/recipe/' + item.key)} key={key}>
                                <img src={item.image} /*alt={tile.title}*/ />
                                <GridListTileBar
                                    title={item.title}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${item.title}`}>
                                            {/* <InfoIcon /> */}
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                        </GridList>
                    </div>
                        :
                        <div>
                            <h1 className="logged-in">You need to be <Link to="/login">logged in</Link> to view this page.</h1>
                        </div>
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default withRouter(withFirebase(HomeComponent));
