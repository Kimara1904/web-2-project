using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Enums;
using Web_2_Online_Shop.ExceptionHandler.Exceptions;
using Web_2_Online_Shop.Interfaces;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;

        public UserService(IRepositoryWrapper repository, IPasswordHasher<User> passwordHasher, IMapper mapper, IMailService mailService)
        {
            _repository = repository;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _mailService = mailService;
        }

        public async Task<UserDTO> EditMyProfile(int id, EditUserDTO newUserInfos)
        {
            var users = await _repository._userRepository.GetAllAsync();
            var user = users.Where(u => u.Id == id).FirstOrDefault() ?? throw new ExceptionHandler.Exceptions.UnauthorizedAccessException("User with this token is not authenticated");

            if (newUserInfos.Email != null)
            {
                var emailUser = users.Where(u => u.Email == newUserInfos.Email).FirstOrDefault();
                if (emailUser != null)
                {
                    throw new ConflictException(string.Format("User with email {0} already exists.", newUserInfos.Email));
                }
            }

            if (newUserInfos.Username != null)
            {
                var usernameUser = users.Where(u => u.Username == newUserInfos.Username).FirstOrDefault();
                if (usernameUser != null)
                {
                    throw new ConflictException(string.Format("User with username {0} already exists.", newUserInfos.Username));
                }
            }

            _mapper.Map(newUserInfos, user);

            if (newUserInfos.NewPassword != null)
            {
                if (newUserInfos.Password == null)
                    throw new BadRequestException("If you want to change password old password is required.");

                if (_passwordHasher.VerifyHashedPassword(user, user.Password, newUserInfos.Password) != PasswordVerificationResult.Success)
                    throw new ConflictException("Wrong old password.");

                var result = _passwordHasher.HashPassword(user, newUserInfos.NewPassword);
                user.Password = result;
            }

            _repository._userRepository.Update(user);
            await _repository.SaveChanges();

            return _mapper.Map<UserDTO>(user);
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

        public async Task<List<UserDTO>> GetUnverifiedSellers()
        {
            var users = await _repository._userRepository.GetAllAsync();
            var unverifiedSellers = users.Where(u => u.Role == Enums.UserRoles.Seller && u.Verificated == Enums.VerificatedStates.Wait).ToList();

            return _mapper.Map<List<User>, List<UserDTO>>(unverifiedSellers);
        }

        public async Task<List<UserDTO>> GetVerifiedSellers()
        {
            var users = await _repository._userRepository.GetAllAsync();
            var unverifiedSellers = users.Where(u => u.Role == Enums.UserRoles.Seller && u.Verificated == Enums.VerificatedStates.Accepted).ToList();

            return _mapper.Map<List<User>, List<UserDTO>>(unverifiedSellers);
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

        public async Task VerifySeller(UserVerifyDTO userVerify)
        {
            var user = await _repository._userRepository.FindAsync(userVerify.Id) ?? throw new NotFoundException(string.Format("User with id: {0} doesn't exist.", userVerify.Id));

            user.Verificated = (VerificatedStates)Enum.Parse(typeof(VerificatedStates), userVerify.Verified);
            string subject = user.Verificated == VerificatedStates.Accepted
                ? "Verification - Account Approved"
                : "Verification - Account Denied";

            string message = user.Verificated == VerificatedStates.Accepted
                ? "Your account is approved. You can now start selling."
                : "Your account is denied. You cannot start selling.";

            await _mailService.SendEmail(subject, message, user.Email);

            _repository._userRepository.Update(user);
            await _repository.SaveChanges();
        }
    }
}
