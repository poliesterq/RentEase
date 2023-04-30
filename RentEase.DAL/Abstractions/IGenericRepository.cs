using System.Linq.Expressions;
using RentEase.Domain.Models.Abstractions;

namespace RentEase.DAL.Abstractions;

public interface IGenericRepository<TEntity> where TEntity : BaseEntity
{
    public Task<IEnumerable<TEntity>> Get(
        Expression<Func<TEntity, bool>> filter = null,
        List<Expression<Func<TEntity, object>>> includes = null,
        string searchParameters = null);

    public Task<TEntity?> Get(
        int id,
        Expression<Func<TEntity, IEnumerable<object>>> collection = null,
        List<Expression<Func<TEntity, object>>> includes = null);

    public Task<TEntity?> FirstOrDefault(
        Expression<Func<TEntity, bool>> condition = null,
        Expression<Func<TEntity, IEnumerable<object>>> collection = null,
        List<Expression<Func<TEntity, object>>> includes = null);

    public Task<TEntity?> Create(TEntity entity);

    public Task<bool> Update(TEntity entity);

    public Task<bool> Delete(int id);

    public Task<int> Count(Expression<Func<TEntity, bool>> condition = null);
}
