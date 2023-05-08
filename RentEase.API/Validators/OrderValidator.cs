using FluentValidation;
using RentEase.API.DTOs;

namespace RentEase.API.Validators;

public class OrderValidator : AbstractValidator<OrderDto>
{
    public OrderValidator()
    {
        RuleFor(order => order.DateFrom)
            .NotNull()
            .NotEmpty()
            .Must(DateFromValidator).WithMessage("Date from should be greater or equal today");
        RuleFor(order => order.DateTo)
            .NotNull()
            .NotEmpty()
            .GreaterThanOrEqualTo(order => order.DateFrom);
        RuleFor(order => order.DeliveryAddress)
            .NotNull()
            .NotEmpty()
            .Length(1, 100);
        RuleFor(order => order.TenantId)
            .NotNull()
            .NotEmpty();
        RuleFor(order => order.ItemId)
            .NotNull()
            .GreaterThan(0);
        RuleFor(order => order.IsConfirmed)
            .NotNull();
    }

    private bool DateFromValidator(DateTime dateFrom)
    {
        return dateFrom >= DateTime.UtcNow.Date;
    }
}