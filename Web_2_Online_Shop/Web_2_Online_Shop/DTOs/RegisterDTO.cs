using Web_2_Online_Shop.Enums;

namespace Web_2_Online_Shop.DTOs
{
    public class RegisterDTO
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string Address { get; set; } = null!;
        public UserRoles Role { get; set; }
        public byte[]? Image { get; set; }
    }
}
