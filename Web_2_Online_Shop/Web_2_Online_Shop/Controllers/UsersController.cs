using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Interfaces;

namespace Web_2_Online_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpPatch]
        public async Task<ActionResult<UserDTO>> EditMyProfile(EditUserDTO newUserInfos)
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var result = await _userService.EditMyProfile(id, newUserInfos);

            return Ok(result);
        }

        [Authorize]
        [HttpPut("image")]
        public async Task<ActionResult<string>> UploadMyImage(IFormFile file)
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            await _userService.UploadMyImage(id, file);

            return Ok("Image successfully uploaded");
        }

        [Authorize]
        [HttpGet("image")]
        public async Task<ActionResult> GetMyImage()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            byte[] image = await _userService.GetMyImage(id);

            return File(image, "image/*");
        }
    }
}
