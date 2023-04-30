namespace RentEase.Domain.Models.Request;

public class DeleteMessageModel
{
    public string ChatId { get; set; }
        
    public string MessageId { get; set; }
}