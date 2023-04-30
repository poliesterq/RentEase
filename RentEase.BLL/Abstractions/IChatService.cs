using RentEase.Domain.Models.Chat;
using RentEase.Domain.Models.Request;

namespace RentEase.BLL.Abstractions;

public interface IChatService
{
    public Task<IEnumerable<Chat>> Get(string userId);

    public Task<Chat?> Get(string chatId, string userId);

    public Task<Chat?> Create(Chat chat);

    public Task<bool> Delete(string id);
    
    public Task<bool> LeaveChat(string chatId, string userId);

    //TODO: change to bool ?
    public Task<Chat?> SendMessage(SendMessageModel message);
    
    //TODO: change to bool ?
    public Task<Chat?> DeleteMessage(DeleteMessageModel message);

    public Task<long> CountUnread(string userId);

    public Task<bool> UpdateUser(ChatUser user);
}