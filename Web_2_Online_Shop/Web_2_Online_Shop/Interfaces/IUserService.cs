namespace Web_2_Online_Shop.Interfaces
{
    public interface IUserService
    {
        Task UploadMyImage(int id, IFormFile file);
        Task<byte[]> GetMyImage(int id);
    }
}
