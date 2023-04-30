using FluentValidation;
using RentEase.Domain.Models.Request;

namespace RentEase.API.Validators;

public class UserRegisterModelValidator : AbstractValidator<UserRegisterModel>
{
    public UserRegisterModelValidator()
    {
        RuleFor(user => user.FirstName)
            .NotNull()
            .NotEmpty()
            .Must(NameValidator).WithMessage("First name must contain only letters")
            .Length(1, 50);
        RuleFor(user => user.LastName)
            .NotNull()
            .NotEmpty()
            .Must(NameValidator).WithMessage("Last name must contain only letters")
            .Length(1, 50);
        RuleFor(user => user.Email)
            .NotNull()
            .NotEmpty()
            .EmailAddress();
        RuleFor(user => user.PhoneNumber)
            .Matches("^[- +()0-9]+")
            .When(user => !string.IsNullOrEmpty(user.PhoneNumber));
        RuleFor(user => user.BirthDate)
            .NotNull()
            .Must(AgeValidator)
            .WithMessage("Specified a valid birthdate");
        RuleFor(user => user.Password)
            .NotNull()
            .NotEmpty()
            .Matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@$!%^*#?&(){}]){6,}")
            .WithMessage("Password must be at least 6 characters and contain small and capital letters, number, special symbol");
    }

    private bool NameValidator(string name)
    {
        return name.All(char.IsLetter);
    }
    
    private bool AgeValidator(DateTime birthdate)
    {
        if (DateTime.Today > birthdate)
        {
            int age = new DateTime(DateTime.Today.Subtract(birthdate).Ticks).Year - 1;
            return age >= 18;
        }

        return false;
    }
}