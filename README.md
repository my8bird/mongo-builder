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
db('user').create(id).set(data).exec(done)
// Add new user with id and return the user to me
db('user').create(id).set(data).exec(doneWithRes)

// Get the user with id
db('user').get(id).exec(doneWithRes);
// Get only certain fields from the user with id
db('user').get(id).fields({name: 1, email: 1}).exec(doneWithRes);

// Update the user with id
db('user').get(id).set(data).exec(done)
// Add new user with id and return the user to me
db('user').get(id).set(data).exec(doneWithRes)

// Search the users for a given email
db('user').where({email: 'bobo@clown.school'}).exec(doneWithRes)
// Of course we can sort, limit and offset things
db('user').where({email: 'bobo@clown.school'}).sort({created: 1}).limit(10).offset(20).exec(doneWithRes)
// sort can also take the list form
db('user').where({email: 'bobo@clown.school'}).sort(['created', 1]).exec(doneWithRes)

// Add a comment to the user
db('user').get(id).push('comments', new_comment).exec(done)

// Grab the first comment the user made
db('user').get(id).pop({comments: 1}).exec(doneWithRes)
db('user').get(id).pop('comments').exec(doneWithRes)

// Add a comment and update the last mod time
db('user').get()id).set({last_mod: new Date()}).push('comments', new_comment).exec(done)

// Incrementing a counter
db('user').get(id).inc('auth.failedLogins').exec()
db('user').get(id).inc('auth.failedLogins', 1).exec()
// Clear the counter
db('user').get(id).inc('auth.failedLogins', 1).exec()

// User removes their email
db('user').get(id).unset('email').exec(done)
// or
db('user').get(id).unset({email: 1}).exec(done)

// Remove user
db('user').remove(id).exec(done)

// Remove set of users
db('user').where({email: 'bobo@clown.school'}).remove().exec(done)
```
