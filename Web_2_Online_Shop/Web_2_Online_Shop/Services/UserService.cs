using Web_2_Online_Shop.ExceptionHandler.Exceptions;
using Web_2_Online_Shop.Interfaces;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repository;
        public UserService(IRepositoryWrapper repository)
        {

            _repository = repository;

        }

        public async Task<User> FindUserByEmailAndPassword(string email, string password)
        {
            var users = await _repository._userRepository.GetAllAsync();
            User? user = users.Where(u => u.Email == email && u.Password == password).FirstOrDefault();

            return user ?? throw new NotFoundException(string.Format("User with email: {0} and password: {1} doesn't exists", email, password));
        }
    }
}
