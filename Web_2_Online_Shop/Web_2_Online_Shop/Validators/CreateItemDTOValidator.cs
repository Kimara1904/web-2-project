using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class CreateItemDTOValidator : AbstractValidator<CreateItemDTO>
    {
        CreateItemDTOValidator()
        {
            RuleFor(i => i.ProductId).NotEmpty().GreaterThan(0);
            RuleFor(i => i.Amount).NotEmpty().GreaterThan(0);
        }
    }
}
