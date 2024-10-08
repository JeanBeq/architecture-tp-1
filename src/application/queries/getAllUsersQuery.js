class GetAllUsersQuery {
    constructor(userRepository, profileRepository) {
      this.userRepository = userRepository;
      this.profileRepository = profileRepository;
    }
  
    async execute() {
      return await this.userRepository.findAll({ include: this.profileRepository });
    }
  }
  
  module.exports = GetAllUsersQuery;