mongo-builder
=============

```javascript
// The API is smart enough to check the pssed in done function to determine if a result is 
// required or just the error state.
funciton done(err) {
   console.log(err);
}

function doneWithRes(err, res) {
   console.log(err, res);
}


// Add new user with id
db('user').set(data).for(id).exec(done)
// Add new user with id and return the user to me
db('user').set(data).for(id).exec(doneWithRes)

// Get the user with id
db('user').get(id).exec(doneWithRes);
// Get only certain fields from the user with id
db('user').get(id).fields({name: 1, email: 1}).exec(doneWithRes);

// Update the user with id
db('user').set(data).for(id).exec(done)
// Add new user with id and return the user to me
db('user').set(data).for(id).exec(doneWithRes)

// Search the users for a given email
db('user').where({email: 'bobo@clown.school'}).exec(doneWithRes)
// Of course we can sort, limit and offset things
db('user').where({email: 'bobo@clown.school'}).sort({created: 1}).limit(10).offset(20).exec(doneWithRes)
// sort can also take the list form
db('user').where({email: 'bobo@clown.school'}).sort(['created', 1]).exec(doneWithRes)

// Add a comment to the user
db('user').set().for(id).push('comments', new_comment).exec(done)

// Grab the first comment the user made
db('user').get(id).pop({comments: 1}).exec(doneWithRes)
db('user').get(id).pop('comments').exec(doneWithRes)

// Add a comment and update the last mod time
db('user').set({last_mod: new Date()}).for(id).push('comments', new_comment).exec(done)

```