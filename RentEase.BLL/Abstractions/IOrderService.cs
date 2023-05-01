using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Request;

namespace RentEase.BLL.Abstractions;

public interface IOrderService
{
    public Task<IEnumerable<Order>> Get(OrderSearchParameters orderParameters);
    
    public Task<Order?> Get(int id);
    
    public Task<Order?> Create(Order order);
    
    public Task<bool> Update(Order order);

    public Task<bool> Delete(int id);

    public Task<bool> Confirm(int id);
}