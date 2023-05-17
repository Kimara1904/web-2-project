using Web_2_Online_Shop.ExceptionHandler.Exceptions;
using Web_2_Online_Shop.Interfaces;

namespace Web_2_Online_Shop.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repository;

        public UserService(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public async Task<byte[]> GetMyImage(int id)
        {
            var user = await _repository._userRepository.FindAsync(id) ?? throw new ExceptionHandler.Exceptions.UnauthorizedAccessException("User with this token is not authenticated");
            if (user.Image == null)
            {
                throw new NotFoundException("This user doesn't have image.");
            }
            return user.Image;
        }

        public async Task UploadMyImage(int id, IFormFile file)
        {
            var user = await _repository._userRepository.FindAsync(id) ?? throw new ExceptionHandler.Exceptions.UnauthorizedAccessException("User with this token is not authenticated");
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();

                user.Image = fileBytes;
                _repository._userRepository.Update(user);
            }

            await _repository.SaveChanges();
        }
    }
}
