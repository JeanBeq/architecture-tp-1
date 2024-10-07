// src/domain/models/user.js
class User {
  constructor(id, email, lastName, firstName, phoneNumber, profileId) {
    this.id = id;
    this.email = email;
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
    this.profileId = profileId;
  }
}

module.exports = User;