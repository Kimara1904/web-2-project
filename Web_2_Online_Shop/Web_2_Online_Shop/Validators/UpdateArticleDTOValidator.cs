using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class UpdateArticleDTOValidator : AbstractValidator<UpdateArticleDTO>
    {
        public UpdateArticleDTOValidator()
        {
            RuleFor(a => a.Name).MaximumLength(20);
            RuleFor(a => a.Price).GreaterThan(0);
            RuleFor(a => a.Amount).GreaterThan(0);
        }
    }
}
