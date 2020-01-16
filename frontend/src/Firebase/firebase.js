import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.database = app.database();
    this.storage = app.storage();
    this.updating = false
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);

  doAddName = (firstName, lastName) => {
    let uid = this.auth.currentUser.uid
    var updates = {}
    updates['users/'+uid+'/firstName'] = firstName
    updates['users/'+uid+'/lastName'] = lastName
    this.database.ref().update(updates)
  }

  doAddRating = (recipe_id, ratings) => {
    let uid = this.auth.currentUser.uid
    var updates = {}
    updates['users/'+uid+'/ratings/'+recipe_id] = ratings
    updates['recipes/'+recipe_id+'/ratings/'+uid] = ratings
    this.database.ref().update(updates)
  }
  doAddComments = (recipe_id, comments) => {
    let uid = this.auth.currentUser.uid
    var updates = {}
    updates['users/'+uid+'/reviews/'+recipe_id] = comments
    updates['recipes/'+recipe_id+'/reviews/'+uid] = comments
    this.database.ref().update(updates)
  }

  saveSearch = (query) => {
    if (this.auth.currentUser) {
      let uid = this.auth.currentUser.uid
      var queries = [query]
      var updates = {}
      this.database.ref('/users/' + uid + '/saved_searches').once('value').then(function(snapshot) {
        let saved = snapshot.val()
        if (saved != null) {
          if (saved.length < 10) {
            queries = queries.concat(saved)
          }
          else queries = queries.concat(saved.slice(0,9))
        }
        updates['users/'+uid+'/saved_searches'] = queries
        this.database.ref().update(updates).then(function(){this.updating = false;}.bind(this))
      }.bind(this));
    }
  }

  getCurrentUser = () => {
    return this.auth.currentUser
  }

  getUID = () => {
    if(this.auth.currentUser == null) {
      return ''
    }
    else {return this.auth.currentUser.uid}
  }

  writeToFirebase = (title, cookingMinutes, mealTypes,dietTypes, allergyTypes, servingSize, ingredients, instructions, ts) => {
  console.log(this)
  let uid = this.auth.currentUser.uid
  let ingredientsArray = ingredients.split(",")
  for (var i =0; i < ingredientsArray.length; i++) {
    if (ingredientsArray[i][0] === " "){
      ingredientsArray[i] = ingredientsArray[i].substr(1)
    }
  }
  let instructionsArray = instructions.split("\n")

  let key = this.database.ref('recipes/').push().key
  let recipeData = {
    title: title,
    author: uid,
    cookingMinutes: cookingMinutes,
    mealTypes: mealTypes,
    dietTypes: dietTypes,
    allergyTypes: allergyTypes,
    servingSize: servingSize,
    ingredients: ingredientsArray,
    instructions: instructionsArray,
    ratings: [],
    avg_rating: 0,
    timestamp: ts,
    viewcount: 1,
    viewcount_week: 1,
    key: key
  }
  var updates = {}
  updates['/recipes/' + key] = recipeData
  updates['users/'+uid+'/recipes/'+key] = key
  this.database.ref().update(updates)
}

}
export default Firebase;
