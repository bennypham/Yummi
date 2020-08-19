import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { Link } from 'react-router-dom';

// Material-UI Imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imgURL: '',
            firstName: '',
            lastName: '',
            imageFront: null,
        }

        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidUpdate() {
        this.getUserName();
    }

    componentDidMount() {
        //var id = this.props.match.params.profileId

    }


    getUserName() {
        var user = this.props.firebase.getCurrentUser()

        if(this.state.firstName === '') {
            if (user) {
                let userId = user.uid
                var userName = this.props.firebase.database.ref('/users/' + userId);
                userName.once('value').then(function (snapshot) {
                    let user = snapshot.val()
                    this.setState({ firstName: user.firstName, lastName: user.lastName })
            }.bind(this))
            var storageRef = this.props.firebase.storage.ref();
            var uploadImg = storageRef.child("images/" + userId);
            uploadImg.getDownloadURL().then(function (downloadURL) {
                this.setState ({imgURL: downloadURL})
            }.bind(this))
        }};
    }

    getProfilePic() {
        var user = this.props.firebase.getCurrentUser()
        console.log(user);
        if (this.state.firstName === '') {
            if (user) {
                let userId = user.uid
                var userName = this.props.firebase.storage.ref('images/' + userId);
                userName.once('value').then(function (snapshot) {
                    let user = snapshot.val()
                    this.setState({ imageFront : user })
                }.bind(this))
            }
        };
    }

    handleUpload = (file) => {
        var fileList = document.getElementById("raised-button-file").files;
        var storageRef = this.props.firebase.storage.ref();
        var uploadImg = storageRef.child("images/" + this.props.firebase.auth.currentUser.uid).put(fileList[0]);
        uploadImg.on('state_changed', function(snapshot) {
        },
        function(error) {
            console.log(error);
        },
        function() {
            uploadImg.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                this.setState = {imgURL : downloadURL};
                }.bind(this)
            );
        });
    }

    handleFollow = () => {
        var user = this.props.firebase.getCurrentUser();
        let userID = user.uid;
        let newFollow = [];
        var avgRatingRecipeRef = this.props.firebase.database.ref('users/' + userID + '/follows/following');
        avgRatingRecipeRef.once('value').then(function (snapshot) {
            if(snapshot.val() != null) {
                newFollow = snapshot.val();
            }
            newFollow.push(this.props.match.params.profileId)
        })


    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => authUser ?
                    <div className="center">
                        <Avatar src={this.state.imgURL} className="big-avatar" />
                        <div>{this.state.firstName}{this.state.lastName}</div>
                        <input
                            accept="image/*"
                            id="raised-button-file"
                            multiple
                            type="file"

                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" onClick={this.handleUpload}>
                                Upload
                            </Button>
                        </label>
                        {/* <Button variant="contained" color="primary" onClick={this.handleFollow}>
                            Follow
                        </Button> */}
                    </div>
                    :
                    <div>
                        <h1 className="logged-in">You need to be <Link to="/login">logged in</Link> to view this page.</h1>
                    </div>
                }
            </AuthUserContext.Consumer>
        )
    }
}

export default withFirebase(Profile);
