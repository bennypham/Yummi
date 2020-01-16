import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 600,
  }
});

export default function Types() {
  const classes = useStyles();

  return (
    <div className="documentation">
      <Typography variant="h4" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="h6" gutterBottom>
        Here you have detailed documentation of all available API functions.
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        To get started, you can make the sample request for each endpoint.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        <b>Get Recipe Information</b>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Use a recipe id to get full information about a recipe, such as
        ingredients, nutrition, diet and allergen information, etc.
        localhost:3000/api/recipe/"{"recipeId"}"
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        <b>Get a Random Recipe</b>
      </Typography>
      <Typography variant="body2" gutterBottom>
        localhost:3000/api/get-random
      </Typography>
      <br/>
      <Typography variant="caption" display="block" gutterBottom>
        In Regards,
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        Yummi
      </Typography>
    </div>
  );
}
