import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Recipe from './Recipe'

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        }
      }

    handleOpen = () => {
        this.setState({open: true})
      };

    handleClose = () => {
        this.setState({open: false})
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
        <div>
            <Card  /* className={classes.card} */ onClick={this.handleOpen}>
              <CardActionArea>
                <CardMedia
                  /* className={classes.media} */
                  image={this.props.recipe.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.props.recipe.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {!this.props.recipe.avg_rating?"No Ratings Yet":"Average Rating: "+this.props.recipe.avg_rating.toFixed(2)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions> */}
            </Card>

            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            >
            <div style={this.getModalStyle()} className="paper">
                <Recipe recipe={this.props.recipe} firebase={this.props.firebase} topClassName={"popup"}/>
                
            </div>
            </Modal>
        </div>
    );
  }
}

export default RecipeCard;
