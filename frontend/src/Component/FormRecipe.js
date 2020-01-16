import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import Filter from './Filter';
import { withFirebase } from '../Firebase';

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

class FormRecipe extends Component {
    state = {
        open: false,
        recipe: {
            title: '',
            cookingMinutes: '',
            servingSize: '',
            instructions: '',
            ingredients: ''
        },
        mealTypeselected: [], dietTypeselected: [], allergyTypeselected: []
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleChange = name => ({ target: {value} }) => {
        //fetch, ajax, axios
        this.setState({
            recipe: {
                ...this.state.recipe,
                [name]: value
            }
        })
    }

    handleSubmit = event => {

        var ts = Math.round((new Date()).getTime() / 1000);
        const { title, cookingMinutes, servingSize, ingredients, instructions } = this.state.recipe;
        this.props.firebase.writeToFirebase(title, cookingMinutes, this.state.mealTypeselected, this.state.dietTypeselected, this.state.allergyTypeselected, servingSize, ingredients, instructions, ts)
    }

    selectionHandler = (childData, key) => {
        if (key === 0) {
          this.setState({mealTypeselected: childData})
        }
        else if (key === 1) {
          this.setState({dietTypeselected: childData})
        }
        else if (key === 2) {
          this.setState({allergyTypeselected: childData})
        }

        console.log(key, childData)

      }


    render() {
        const { open, recipe: { title, cookingMinutes, servingSize, ingredients, instructions} } = this.state;

        return (
            <Fragment>
                <Fab color="default" size="small" onClick={this.handleToggle}>
                    <AddIcon />
                </Fab>
                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    fullWidth={true}

                >
                    <DialogTitle id="dialog">
                        Create new recipe
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below.
                        </DialogContentText>

                        <form >
                            <TextField
                                id="title"
                                label="Recipe Title"
                                value={title}
                                onChange={this.handleChange('title')}
                                margin="normal"
                                fullWidth={true}
                            />
                            <br/>
                            <TextField
                                id="cookingMinutes"
                                label="Cook Time In Minutes"
                                type="number"
                                value={cookingMinutes}
                                onChange={this.handleChange('cookingMinutes')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth={true}
                                margin="normal"
                            />
                            <br/>

                                  {/*<TextField
                                id="dish-Type"
                                label="Dish Type seperated by commas"
                                value={dishType}
                                onChange={this.handleChange('dishType')}
                                margin="normal"
                                fullWidth={true}
                            />*/}
                            <br/>
                            <Filter
                                names = {mealtypes}
                                title = {"Meal Types"}
                                parentSelected = {this.selectionHandler}
                                index = {0}
                            />
                            <br/>
                            <Filter
                                names = {diets}
                                title = {"Diets"}

                                    parentSelected = {this.selectionHandler}
                                index = {1}
                            />
                            <br/>
                            <Filter
                                names = {allergies}
                                title = {"Allergies"}
                                parentSelected = {this.selectionHandler}
                                index = {2}
                            />
                            <br/>
                            <TextField
                                id="serving-size"
                                label="Serving Size"
                                value={servingSize}
                                onChange={this.handleChange('servingSize')}
                                margin="normal"
                                fullWidth={true}
                            />
                            <br/>
                            <TextField
                                id="ingredients"
                                label="Ingredients seperated by commas"
                                value={ingredients}
                                onChange={this.handleChange('ingredients')}
                                multiline
                                rowsMax="100"
                                margin="normal"
                                fullWidth={true}
                            />
                            <br/>
                            <TextField
                                id="instructions"
                                label="Instructions seperated by numbers"
                                value={instructions}
                                onChange={this.handleChange('instructions')}
                                multiline
                                rowsMax="100"
                                margin="normal"
                                fullWidth={true}
                            />
                            <br/>

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>

                        </form>

                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default withFirebase(FormRecipe);

