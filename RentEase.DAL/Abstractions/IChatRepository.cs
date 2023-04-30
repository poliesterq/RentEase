using System.Linq.Expressions;
using RentEase.Domain.Models.Chat;

namespace RentEase.DAL.Abstractions;

public interface IChatRepository
{
    public Task<Chat?> FirstOrDefault(Expression<Func<Chat, bool>> filter);

    public Task<IEnumerable<Chat>> Get(Expression<Func<Chat, bool>> filter = null);

    public Task<Chat?> Get(string id);

    public Task<Chat?> Create(Chat chat);

    public Task<Chat?> Update(Chat chat);

    public Task<bool> Delete(string id);

    public Task<long> Count(Expression<Func<Chat, bool>> condition = null);

}