using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterDTO>
    {
        public RegisterValidator()
        {
            RuleFor(user => user.Username).NotEmpty().Length(6, 15);
            RuleFor(user => user.Email).EmailAddress().NotEmpty();
            RuleFor(user => user.Password).NotEmpty()
                      .MinimumLength(8)
                      .MaximumLength(30)
                      .Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$")
                      .WithMessage("Password must contain at least one uppercase, lowercase letter, digit and special character");
            RuleFor(user => user.FirstName).NotEmpty().MaximumLength(30);
            RuleFor(user => user.LastName).NotEmpty().MaximumLength(30);
            RuleFor(user => user.BirthDate).NotEmpty().GreaterThan(DateTime.Now.AddYears(-18)).WithMessage("User must have 18 years and above");
            RuleFor(user => user.Role).NotEmpty().NotEqual(Enums.UserRoles.Admin).WithMessage("Admin can't be registered");
        }
    }
}
