const UserModel = require('../../infrastructure/orm/sequelize/models/userModel');
const ProfileModel = require('../../infrastructure/orm/sequelize/models/profileModel');

const CreateUserCommand = require('../../application/commands/createUserCommand');
const UpdateUserCommand = require('../../application/commands/updateUserCommand');
const DeleteUserCommand = require('../../application/commands/deleteUserCommand');
const GetAllUsersQuery = require('../../application/queries/getAllUsersQuery');

const createUserCommand = new CreateUserCommand(UserModel, ProfileModel);
const updateUserCommand = new UpdateUserCommand(UserModel);
const deleteUserCommand = new DeleteUserCommand(UserModel);
const getAllUsersQuery = new GetAllUsersQuery(UserModel, ProfileModel);

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersQuery.execute();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, lastName, firstName, phoneNumber, profileId } = req.body;
    const newUser = await createUserCommand.execute({ email, lastName, firstName, phoneNumber, profileId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, lastName, firstName, phoneNumber, profileId } = req.body;
    const user = await updateUserCommand.execute(id, { email, lastName, firstName, phoneNumber, profileId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserCommand.execute(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};