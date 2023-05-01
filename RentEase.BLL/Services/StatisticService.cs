using Microsoft.Extensions.Logging;
using RentEase.BLL.Abstractions;
using RentEase.DAL.Abstractions;
using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Response;

namespace RentEase.BLL.Services;

public class StatisticService : IStatisticService
{
    private readonly ILogger<StatisticService> _logger;
    private readonly IGenericRepository<Order> _orderRepository;

    public StatisticService(ILogger<StatisticService> logger, IGenericRepository<Order> orderRepository)
    {
        _logger = logger;
        _orderRepository = orderRepository;
    }

    public async Task<IEnumerable<OrderStatistic>> LandlordOrderStatistic(string landlordId)
    {
        var orders = await _orderRepository.Get(
            order => order.Item.LandlordId == landlordId,
            new()
            {
                order => order.Item
            });
        
        var orderStatistics = orders
            .GroupBy(order => new { order.DateFrom.Year, order.DateFrom.Month })
            .Select(group => new OrderStatistic
            {
                DateFrom = new DateTime(group.Key.Year, group.Key.Month, 1),
                DateTo = new DateTime(group.Key.Year, group.Key.Month, DateTime.DaysInMonth(group.Key.Year, group.Key.Month)),
                Orders = group.ToList()
            });

        _logger.LogInformation($"Order statistics was got for user {landlordId}");
        return orderStatistics;
    }

    public async Task<IEnumerable<CategoryStatistic>> LandlordCategoryStatistic(string landlordId)
    {
        var orders = await _orderRepository.Get(
            order => order.Item.LandlordId == landlordId,
            new()
            {
                order => order.Item
            });
        
        var categoryStatistics = orders
            .Select(order => order.Item)
            .GroupBy(item => item.Category)
            .Select(grouping => new CategoryStatistic
            {
                Category = grouping.Key,
                Count = grouping.Count()
            });
        
        _logger.LogInformation($"Category order statistics was got for user {landlordId}");
        return categoryStatistics;
    }

    public async Task<IEnumerable<ExpenseStatistic>> TenantExpenseStatistic(string tenantId)
    {
        var orders = await _orderRepository.Get(
            order => order.TenantId == tenantId && order.IsConfirmed,
            new()
            {
                order => order.Item
            });

        var expenseStatistics = orders
            .Select(order => order.Item)
            .GroupBy(item => item.Category)
            .Select(group => new ExpenseStatistic
            {
                Category = group.Key,
                ExpenseUS = group.Sum(i => i.PriceUS),
                ExpenseUA = group.Sum(i => i.PriceUA)
            });
        
        _logger.LogInformation($"Expense order statistics was got for user {tenantId}");
        return expenseStatistics;
    }
}