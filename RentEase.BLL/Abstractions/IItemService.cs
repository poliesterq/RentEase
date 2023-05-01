using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Request;

namespace RentEase.BLL.Abstractions;

public interface IItemService
{
    public Task<IEnumerable<Item>> Get(ItemSearchParameters itemParameters);
    
    public Task<Item?> Get(int id);
    
    public Task<Item?> Create(Item item);
    
    public Task<bool> Update(Item item);

    public Task<bool> Delete(int id);
    
    public Task UpdateStatus();
}