using FluentValidation;
using RentEase.Domain.Models.Request;

namespace RentEase.API.Validators;

public class DeleteMessageModelValidator : AbstractValidator<DeleteMessageModel>
{
    public DeleteMessageModelValidator()
    {
        RuleFor(message => message.ChatId)
            .NotNull()
            .NotEmpty();
        RuleFor(message => message.MessageId)
            .NotNull()
            .NotEmpty();
    }
}