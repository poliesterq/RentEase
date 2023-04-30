using System.Linq.Expressions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RentEase.DAL.Abstractions;
using RentEase.Domain.Configurations;
using RentEase.Domain.Models.Chat;

namespace RentEase.DAL.Services;

public class ChatRepository : IChatRepository
{
    private readonly MongoOptions _mongoSettings;
    private readonly IMongoCollection<Chat> _chats;

    public ChatRepository(IOptions<MongoOptions> mongoSettings)
    {
        _mongoSettings = mongoSettings.Value;
        var client = new MongoClient(_mongoSettings.ConnectionString);
        var db = client.GetDatabase(_mongoSettings.DatabaseName);
        _chats = db.GetCollection<Chat>(_mongoSettings.ChatCollection);
    }

    public async Task<Chat?> FirstOrDefault(Expression<Func<Chat, bool>> filter)
    {
        var result = await _chats.FindAsync(filter);
        return await result.FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Chat>> Get(Expression<Func<Chat, bool>> filter = null)
    {
        filter ??= chat => true;

        var sortDefinition = new SortDefinitionBuilder<Chat>().Descending("Messages.SendTime");
        var result = await _chats.FindAsync(filter, new FindOptions<Chat>() { Sort = sortDefinition });

        return await result.ToListAsync();
    }

    public async Task<Chat?> Get(string id)
    {
        var result = await _chats.FindAsync(chat => chat.Id == id);
        return await result.FirstOrDefaultAsync();
    }

    public async Task<Chat?> Create(Chat chat)
    {
        var count = await _chats.CountDocumentsAsync(_ => true);
        await _chats.InsertOneAsync(chat);
        return count >= await _chats.CountDocumentsAsync(_ => true) ? null : chat;
    }

    public async Task<Chat?> Update(Chat chat)
    {
        var result = await _chats.ReplaceOneAsync(
            comparisonChat => comparisonChat.Id == chat.Id,
            chat,
            new ReplaceOptions { IsUpsert = true }
        );

        return result.IsAcknowledged && result.MatchedCount > 0 ? chat : null;
    }

    public async Task<bool> Delete(string id)
    {
        var result = await _chats.DeleteOneAsync(chat => chat.Id == id);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }

    public async Task<long> Count(Expression<Func<Chat, bool>> condition = null)
    {
        condition ??= chat => true;
        return await _chats.CountDocumentsAsync(condition);
    }
}