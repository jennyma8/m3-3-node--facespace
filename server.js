'use strict';

const express = require('express');
const morgan = require('morgan');

const { users } = require('./data/users');

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

//#1.3
const handleHomepage = (req, res) => {
   res.status(200).render('pages/homepage', {users: users});
};

//#2.1 _id from 1106 to 1032
const handleProfilePage = (req, res) => {
  res.status(200).render('pages/profile', {
    users: users.filter((user) => user._id === req.params._id),
  });
};

// -----------------------------------------------------
// server endpoints
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
.get('/', handleHomepage)
//#2.1 see line 19
.get('/users/:_id', handleProfilePage)

  // a catchall endpoint that will send the 404 message.
  .get('*', handleFourOhFour)


  .listen(8000, () => console.log('Listening on port 8000'));
