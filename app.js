// app.js
const sequelize = require('./database');
const User = require('./models/userModel');
const Profile = require('./models/profileModel');

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});