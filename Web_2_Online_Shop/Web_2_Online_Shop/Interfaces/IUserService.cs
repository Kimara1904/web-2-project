using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IUserService
    {
        Task<User> FindUserByEmailAndPassword(string email, string password);
    }
}
