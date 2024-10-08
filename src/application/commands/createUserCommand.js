class CreateUserCommand {
    constructor(userRepository, profileRepository) {
      this.userRepository = userRepository;
      this.profileRepository = profileRepository;
    }
  
    async execute(userData) {
      const profile = await this.profileRepository.findOrCreate({
        where: { id: userData.profileId || 1 },
        defaults: { role: 'user' }
      });
      userData.profileId = profile[0].id;
      return await this.userRepository.create(userData);
    }
  }
  
  module.exports = CreateUserCommand;