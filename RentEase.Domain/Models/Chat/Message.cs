using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RentEase.Domain.Models.Chat;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Text { get; set; }

    public ChatUser Author { get; set; }

    public DateTime SendTime { get; set; } = DateTime.UtcNow;

    public bool IsRead { get; set; }
}