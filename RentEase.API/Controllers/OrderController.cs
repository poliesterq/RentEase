using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentEase.API.Attributes;
using RentEase.API.DTOs;
using RentEase.BLL.Abstractions;
using RentEase.Domain.Enums;
using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Request;

namespace RentEase.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrderController(IOrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] OrderSearchParameters orderParameters)
    {
        return Ok(await _orderService.Get(orderParameters));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var order = await _orderService.Get(id);
        return order != null ? Ok(order) : NotFound();
    }

    [HttpPost]
    [AuthorizeRoles(Role.User)]
    public async Task<IActionResult> Create(OrderDto orderDto)
    {
        var order = _mapper.Map<Order>(orderDto);
        var result = await _orderService.Create(order);
        return result != null ? Ok(result) : BadRequest();
    }

    [HttpPut("Update")]
    [AuthorizeRoles(Role.User)]
    public async Task<IActionResult> Update(OrderDto orderDto)
    {
        var order = _mapper.Map<Order>(orderDto);
        var result = await _orderService.Update(order);
        return result ? Ok() : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _orderService.Delete(id);
        return result ? Ok() : NotFound();
    }
    
    [HttpPut("Confirm/{id}")]
    [AuthorizeRoles(Role.User)]
    public async Task<IActionResult> Confirm(int id)
    {
        var result = await _orderService.Confirm(id);
        return result ? Ok() : BadRequest();
    }
}