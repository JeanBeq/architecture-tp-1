class DeleteUserCommand {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(id) {
      const user = await this.userRepository.findByPk(id);
      if (user) {
        await user.destroy();
      }
    }
  }
  
  module.exports = DeleteUserCommand;