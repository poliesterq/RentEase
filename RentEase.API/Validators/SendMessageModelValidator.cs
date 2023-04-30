using FluentValidation;
using RentEase.Domain.Models.Request;

namespace RentEase.API.Validators;

public class SendMessageModelValidator : AbstractValidator<SendMessageModel>
{
    public SendMessageModelValidator()
    {
        RuleFor(message => message.ChatId)
            .NotNull()
            .NotEmpty();
        RuleFor(message => message.Message)
            .NotNull()
            .NotEmpty();
    }
}