import React from 'react';
import { withFirebase } from '../Firebase';

// Material-UI imports
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const LogOutButton = ({ firebase }) => (
      <ListItem onClick={firebase.doSignOut}>
                <ListItemLink href="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemLink>
            </ListItem>
  );

  export default withFirebase(LogOutButton);
