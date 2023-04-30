using RentEase.Domain.Models.Chat;

namespace RentEase.Domain.Models.Request;

public class SendMessageModel
{
    public string ChatId { get; set; }

    public Message Message { get; set; }
}