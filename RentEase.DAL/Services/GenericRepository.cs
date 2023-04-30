using System.Linq.Expressions;
using Korzh.EasyQuery.Linq;
using Microsoft.EntityFrameworkCore;
using RentEase.DAL.Abstractions;
using RentEase.Domain.Models.Abstractions;

namespace RentEase.DAL.Services;

public class GenericRepository<TEntity>: IGenericRepository<TEntity> where TEntity : BaseEntity
{
    private readonly DataContext _dbContext;
    private readonly DbSet<TEntity> _entities;

    public GenericRepository(DataContext dbContext)
    {
        _dbContext = dbContext;
        _entities = dbContext.Set<TEntity>();
    }

    public virtual async Task<int> Count(Expression<Func<TEntity, bool>> condition = null)
    {
        return condition == null ? await _entities.CountAsync() : await _entities.CountAsync(condition);
    }

    public virtual async Task<IEnumerable<TEntity>> Get(
        Expression<Func<TEntity, bool>> filter = null,
        List<Expression<Func<TEntity, object>>> includes = null,
        string searchParameters = null)
    {
        IQueryable<TEntity> query = _entities;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (includes != null)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
        }

        if (searchParameters != null)
        {
            query = query.FullTextSearchQuery(searchParameters);
        }

        return await query.AsNoTracking().ToListAsync();
    }

    public virtual async Task<TEntity?> Get(
        int id,
        Expression<Func<TEntity, IEnumerable<object>>> collection = null,
        List<Expression<Func<TEntity, object>>> includes = null)
    {
        var entity = await _entities.FirstOrDefaultAsync(entity => entity.Id == id);

        if (entity != null && collection != null)
        {
            await _dbContext.Entry(entity).Collection(collection).LoadAsync();
        }

        if (entity != null && includes != null)
        {
            foreach (var include in includes)
            {
                await _dbContext.Entry(entity).Reference(include).LoadAsync();
            }
        }

        return entity;
    }

    public virtual async Task<TEntity?> FirstOrDefault(
        Expression<Func<TEntity, bool>> condition,
        Expression<Func<TEntity, IEnumerable<object>>> collection = null,
        List<Expression<Func<TEntity, object>>> includes = null)
    {
        if (collection == null && includes == null)
        {
            return await _entities.AsNoTracking().FirstOrDefaultAsync(condition);
        }

        var entity = await _entities.FirstOrDefaultAsync(condition);

        if (entity != null && collection != null)
        {
            await _dbContext.Entry(entity).Collection(collection).LoadAsync();
        }

        if (entity != null && includes != null)
        {
            foreach (var include in includes)
            {
                await _dbContext.Entry(entity).Reference(include).LoadAsync();
            }
        }

        return entity;
    }

    public virtual async Task<TEntity?> Create(TEntity entity)
    {
        await _entities.AddAsync(entity);
        return await _dbContext.SaveChangesAsync() > 0 ? entity : null;
    }

    public virtual async Task<bool> Update(TEntity entity)
    {
        if (!_entities.Contains(entity))
        {
            return false;
        }

        _entities.Update(entity);
        return await _dbContext.SaveChangesAsync() > 0;

    }

    public virtual async Task<bool> Delete(int id)
    {
        var entity = await this.Get(id);

        if (entity == null)
        {
            return false;
        }

        _entities.Remove(entity);
        return await _dbContext.SaveChangesAsync() > 0;
    }
}