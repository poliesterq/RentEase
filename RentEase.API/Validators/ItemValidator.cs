using FluentValidation;
using RentEase.API.DTOs;

namespace RentEase.API.Validators;

public class ItemValidator : AbstractValidator<ItemDto>
{
    public ItemValidator()
    {
        RuleFor(item => item.Title)
            .NotNull()
            .NotEmpty()
            .Length(1, 100);
        RuleFor(item => item.Description)
            .NotNull()
            .NotEmpty()
            .Length(1, 500);
        RuleFor(item => item.Address)
            .NotNull()
            .NotEmpty()
            .Length(1, 100);
        RuleFor(item => item.Category)
            .NotNull()
            .IsInEnum();
        RuleFor(item => item.IsAvailable)
            .NotNull();
        RuleFor(item => item.PriceUS)
            .GreaterThan(0)
            .NotNull();
        RuleFor(item => item.LandlordId)
            .NotNull()
            .NotEmpty();
    }
}