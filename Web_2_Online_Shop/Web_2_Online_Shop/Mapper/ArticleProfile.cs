using AutoMapper;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Mapper
{
    public class ArticleProfile : Profile
    {
        public ArticleProfile()
        {
            CreateMap<Article, ArticleDTO>();
            CreateMap<CreateArticleDTO, Article>();
            CreateMap<UpdateArticleDTO, Article>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
