using System.Linq.Expressions;
using Microsoft.Extensions.Logging;
using RentEase.BLL.Abstractions;
using RentEase.DAL.Abstractions;
using RentEase.Domain.Extensions;
using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Request;

namespace RentEase.BLL.Services;

public class OrderService : IOrderService
{
    private readonly ILogger<OrderService> _logger;
    private readonly IGenericRepository<Order> _orderRepository;

    public OrderService(
        ILogger<OrderService> logger, 
        IGenericRepository<Order> orderRepository)
    {
        _logger = logger;
        _orderRepository = orderRepository;
    }

    public async Task<IEnumerable<Order>> Get(OrderSearchParameters orderParameters)
    {
        Expression<Func<Order, bool>> orderCondition = order => true;
        
        if (orderParameters.TenantId != null)
        {
            orderCondition = orderCondition.AndAlso(order => order.TenantId == orderParameters.TenantId);
        }
        
        if (orderParameters.DateFrom != null)
        {
            orderCondition = orderCondition.AndAlso(order => order.DateFrom >= orderParameters.DateFrom);
        }
        
        if (orderParameters.DateTo != null)
        {
            orderCondition = orderCondition.AndAlso(order => order.DateTo <= orderParameters.DateTo);
        }
        
        if (orderParameters.IsConfirmed != null)
        {
            orderCondition = orderCondition.AndAlso(order => order.IsConfirmed == orderParameters.IsConfirmed);
        }
        
        if (orderParameters.ItemId != null)
        {
            orderCondition = orderCondition.AndAlso(order => order.ItemId == orderParameters.ItemId);
        }
        
        var orders = await _orderRepository.Get(
            orderCondition, 
            new()
            {
                order => order.Tenant,
                order => order.Item
                
            },
            orderParameters.SearchParameter);
        
        _logger.LogInformation("Orders were got");
        return orders;
    }

    public async Task<Order?> Get(int id)
    {
        var order = await _orderRepository.Get(
            id,
            includes: new()
            {
                order => order.Tenant,
                order => order.Item,

            });
        
        var logInformation = order == null
            ? $"Order with id = {id} wasn't got"
            : $"Order with id = {id} was got";
        _logger.LogInformation(logInformation);
        return order;
    }

    public async Task<Order?> Create(Order order)
    {
        var orderResult = await _orderRepository.Create(order);
        
        var logInformation = orderResult == null
            ? "Order wasn't created"
            : $"Order with id = {orderResult.Id} was created";
        _logger.LogInformation(logInformation);
        return orderResult;
    }

    public async Task<bool> Update(Order order)
    {
        var result = await _orderRepository.Update(order);
        
        var logInformation = result
            ? $"Order with id = {order.Id} wasn't updated"
            : $"Order with id = {order.Id} was updated";
        _logger.LogInformation(logInformation);
        return result;
    }

    public async Task<bool> Delete(int id)
    {
        var result = await _orderRepository.Delete(id);
        
        var logInformation = result
            ? $"Order with id = {id} wasn't deleted"
            : $"Order with id = {id} was deleted";
        _logger.LogInformation(logInformation);
        return result;
    }

    public async Task<bool> Confirm(int id)
    {
        var order = await _orderRepository.Get(id, includes: new() { order => order.Item});

        if (order == null)
        {
            return false;
        }

        order.IsConfirmed = true;
        if (order.DateFrom == DateTime.Today)
        {
            order.Item.IsAvailable = false;
        }
        
        return await _orderRepository.Update(order);
    }
}