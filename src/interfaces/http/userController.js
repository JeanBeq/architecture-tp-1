const UserModel = require('../../infrastructure/orm/sequelize/models/userModel');
const ProfileModel = require('../../infrastructure/orm/sequelize/models/profileModel');

const CreateUserCommand = require('../../application/commands/createUserCommand');
const UpdateUserCommand = require('../../application/commands/updateUserCommand');
const DeleteUserCommand = require('../../application/commands/deleteUserCommand');
const GetAllUsersQuery = require('../../application/queries/getAllUsersQuery');

const axios = require('axios');

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
  const transaction = await UserModel.sequelize.transaction();
  try {
    const { email, lastName, firstName, phoneNumber, profileId } = req.body;
    const newUser = await createUserCommand.execute({ email, lastName, firstName, phoneNumber, profileId });

    await axios.post('http://localhost:3001/accounts/new', {
      userId: newUser.id,
      accountNumber: `ACC-${newUser.id}`,
      balance: 0
    });

    await transaction.commit();
    res.status(201).json(newUser);
  } catch (error) {
    await transaction.rollback();
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
  const transaction = await UserModel.sequelize.transaction();
  try {
    const { id } = req.params;
    await deleteUserCommand.execute(id);

    await axios.delete(`http://localhost:3001/accounts/${id}`);

    await transaction.commit();
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};