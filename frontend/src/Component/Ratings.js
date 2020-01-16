import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withFirebase } from '../Firebase';


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ''}>
      <span {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  rating1: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

 function Ratings(props) {
  const [value, setValue] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Leave a rating</Typography>
        <div className={classes.rating1}>
          <Rating
            name="hover-side"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
              props.firebase.doAddRating(props.recipe_id, newValue)
            }}
          />
          <Box ml={2}>{labels[value !== -1 ? value : value]}</Box>
        </div>
      </Box>

    </div>
  );
}

export default withFirebase(Ratings);