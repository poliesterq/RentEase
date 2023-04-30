using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RentEase.Domain.Models.Chat;

public class Chat
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    public string? Title { get; set; }
    
    public List<ChatUser> Users { get; set; }

    public List<Message> Messages { get; set; }
}