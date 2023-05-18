using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> EditMyProfile(int id, EditUserDTO newUserInfos);
        Task UploadMyImage(int id, IFormFile file);
        Task<byte[]> GetMyImage(int id);
    }
}
