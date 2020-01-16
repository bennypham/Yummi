const functions = require('firebase-functions');
const _ = require('lodash');
const request = require('request-promise');

// indexing recipe function
exports.indexRecipes2Elastic = functions.database.ref('recipes/{recipeId}')
.onWrite((change, context) => {

  // Only edit data when it is first created.
  if (change.before.exists()) {
    return null;
  }
  // Exit when the data is deleted.
  if (!change.after.exists()) {
    return null;
  }

  let recipe = change.after.val();
  let id   = context.params.recipeId;

  console.log('Indexing recipe ', id, recipe);

  let elasticsearchFields = ['title', 'mealTypes', 'dietTypes', 'allergyTypes', 'extendedIngredients', 'ingredients','instructions'];
  let elasticSearchConfig = functions.config().elasticsearch;
  let elasticSearchUrl = elasticSearchConfig.url + 'recipes/_doc/' + id;
  let elasticSearchMethod = recipe ? 'PUT' : 'DELETE';

  let elasticsearchRequest = {
    method: elasticSearchMethod,
    uri: elasticSearchUrl,
    auth: {
      username: elasticSearchConfig.username,
      password: elasticSearchConfig.password,
    },
    body: _.pick(recipe, elasticsearchFields),
    json: true
  };

  return request(elasticsearchRequest).then(response => {
    console.log('Elasticsearch response', response);
    return elasticsearchRequest;
  })

});

// average rating cloud functions
exports.updateAverageRating = functions.database.ref('recipes/{recipeId}')
.onWrite((change, context) => {

  // if (change.before.ref.child('ratings').length == change.after.ref.child('ratings').length) {
  // 	return null;
  // }

  let recipe = change.after.val();
  let id   = context.params.recipeId;

  console.log('Updating average rating ', id, recipe);

  // calc new avg rating
  var avg_rating = 0.0;
  var count = 0;

  for (var key in recipe['ratings']) {
    avg_rating += recipe['ratings'][key];
    count++;
  }

  avg_rating /= count;
  console.log("new avg rating: ", avg_rating);

  return change.after.ref.child('avg_rating').set(avg_rating);
});

// followers cloud function
exports.updateFollows = functions.database.ref('users/{userId}/follows/following')
.onWrite((change, context) => {
  var bef = change.before.val()
  var aft = change.after.val()

  console.log("Bef: " + bef)
  console.log("Aft: " + aft)
  
  if (bef.length !== null || aft.length !== null) {
    if (bef.length > aft.length) {
      // decrement
      let difference = bef.filter(x => !aft.includes(x));
      let fref = change.after.ref.parent.parent.parent.child(difference[0]).child("follows").child("num_followers");
      // var fcount;
      // console.log("fref: " + fref)
      // fref.on('value', function(dataSnapshot) {
      //   console.log("datasnap: ", dataSnapshot.val());
      //   var fcount = dataSnapshot.ref;
      //   console.log("fcount: " + fcount);
      // })
      // console.log("fcount before: " + fcount);
      // fcount--;
      // console.log("fcount after: " + fcount);
      // return change.after.ref.parent.parent.parent.child(difference[0]).child("follows").child("num_followers").set(fcount)
      return fref.once('value', (dataSnapshot) => {
        var fcount = dataSnapshot.val();
        console.log("fcount before: " + fcount);
        fcount--;
        console.log("fcount after: " + fcount);
        fref.parent.update({"num_followers": fcount})
      })
    }
    
    else if (bef.length < aft.length) {
      // increment
      let difference = aft.filter(x => !bef.includes(x));
      let fref = change.after.ref.parent.parent.parent.child(difference[0]).child("follows").child("num_followers");
      // var fcount;
      // console.log("fref: " + fref)
      // fref.on('value', function(dataSnapshot) {
      //   console.log("datasnap: ", dataSnapshot.val());
      //   var fcount = dataSnapshot.val();
      //   console.log("fcount: " + fcount);
      // })
      // console.log("fcount bef: " + fcount);
      // fcount++;
      // console.log("fcount aft: " + fcount);
      // return change.after.ref.parent.parent.parent.child(difference[0]).child("follows").child("num_followers").set(fcount)
      return fref.once('value', (dataSnapshot) => {
        var fcount = dataSnapshot.val();
        console.log("fcount before: " + fcount);
        fcount++;
        console.log("fcount after: " + fcount);
        fref.parent.update({"num_followers": fcount})
      })
    }
  }
  return null;
});

// update trending per week
exports.trendingRecipesPerWeek = functions.database.ref('recipes/{recipeId}')
.onWrite((change, context) => {
  const parentRef = change.after.ref.parent;
  console.log('parentref: ', parentRef);
  const targetRef = parentRef.parent.child('trending_recipes_by_week');
  targetRef.update({})
  console.log('targetRef: ', targetRef);

  // let recipe = change.after.val();
  return parentRef.once('value').then(snapshot => {
    var updates = [];

    // child: recipe_id
    console.log('snapshot: ', snapshot.val());
    snapshot.forEach((child) => {
      // console.log('child: ', child)
      var recipe = child.val();
      var recipe_id = recipe.key;
      var recipe_viewcount_week = recipe.viewcount_week;
      // console.log(recipe_id)
      
      updates.push({
        recipe_id: recipe_id,
        recipe_viewcount_week: recipe_viewcount_week,
        recipe: recipe
      });
      
    });
    console.log('updates: ', updates);

    function compare( a, b ) {
      if ( a.recipe_viewcount_week > b.recipe_viewcount_week ){
        return -1;
      }
      if ( a.recipe_viewcount_week < b.recipe_viewcount_week ){
        return 1;
      }
      return 0;
    }
    
    updates.sort( compare );
    console.log('updates: ', updates);

    let num_trending = 10;
    let tmp = updates.slice(0, num_trending);
    let ret = []
    console.log('tmp: ', tmp)

    tmp.forEach((elem) => {
      let k1 = elem['recipe_id']
      let k2 = elem['recipe']
      // tmp = {k1: k2}
      targetRef.update({
        [k1]: k2
      })
    });
    console.log(ret)

    return;
  });
});

// followers cloud function
// exports.TrendingRecipePerWeek = functions.pubsub.topic('TrendingRecipePerWeek')
// .onPublish(() => {
//   // update trending recipes
// });

// firebase functions:config:set elasticsearch.username="user" elasticsearch.password="HK84xo7XWBb4" elasticsearch.url="http://34.94.0.82//elasticsearch/"
