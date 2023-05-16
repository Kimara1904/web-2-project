using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.ExceptionHandler.Exceptions;
using Web_2_Online_Shop.Interfaces;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IConfiguration _configuration;

        public AuthenticationService(IRepositoryWrapper repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public async Task<string> Login(string email, string password)
        {
            var users = await _repository._userRepository.GetAllAsync();
            User? user = users.Where(u => u.Email == email && u.Password == password).FirstOrDefault() ?? throw new NotFoundException(string.Format("User with email: {0} and password: {1} doesn't exists", email, password));

            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"] ?? "default"),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("Email", user.Email),
                        new Claim("Role", user.Role.ToString())
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "default"));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task Register(RegisterDTO userInfo)
        {
            var users = await _repository._userRepository.GetAllAsync();
            User? userEmail = users.Where(u => u.Email == userInfo.Email).FirstOrDefault();

            if (userEmail != null)
            {
                throw new ConflictException(string.Format("User with email: {0} already exists.", userInfo.Email));
            }

            User? userUsername = users.Where(u => u.Username == userInfo.Username).FirstOrDefault();

            if (userUsername != null)
            {
                throw new ConflictException(string.Format("User with username: {0} already exists.", userInfo.Username));
            }

            //Adding new User
        }
    }
}
