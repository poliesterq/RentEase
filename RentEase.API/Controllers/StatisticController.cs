using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentEase.BLL.Abstractions;

namespace RentEase.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class StatisticController : ControllerBase
{
    private readonly IStatisticService _statisticService;

    public StatisticController(IStatisticService statisticService)
    {
        _statisticService = statisticService;
    }
    
    [HttpGet("Order/{landlordId}")]
    public async Task<IActionResult> OrderStatistic(string landlordId)
    {
        return Ok(await _statisticService.LandlordOrderStatistic(landlordId));
    }
    
    [HttpGet("Category/{landlordId}")]
    public async Task<IActionResult> CategoryStatistic(string landlordId)
    {
        return Ok(await _statisticService.LandlordCategoryStatistic(landlordId));
    }
    
    [HttpGet("Expense/{tenantId}")]
    public async Task<IActionResult> ExpenseStatistic(string tenantId)
    {
        return Ok(await _statisticService.TenantExpenseStatistic(tenantId));
    }
}