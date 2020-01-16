import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './Styles/Logout.css'

class Logout extends Component {
    render() {
        return (
          <div>
            <h2 className="logged-out-text">You Have been logged out</h2>
               <p className="logged-out"> Click <Link to="/login">here</Link> to log back in.</p>
          </div>
    );
  }
}

export default withFirebase(Logout);
