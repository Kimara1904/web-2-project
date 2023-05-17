using AutoMapper;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Enums;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => (UserRoles)Enum.Parse(typeof(UserRoles), src.Role)));
        }
    }
}
