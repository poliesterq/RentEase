using RentEase.Domain.Models.Response;

namespace RentEase.BLL.Abstractions;

public interface IStatisticService
{
    Task<IEnumerable<OrderStatistic>> LandlordOrderStatistic(string landlordId);

    Task<IEnumerable<CategoryStatistic>> LandlordCategoryStatistic(string landlordId);

    Task<IEnumerable<ExpenseStatistic>> TenantExpenseStatistic(string tenantId);
}