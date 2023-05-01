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
public class ItemController : ControllerBase
{
    private readonly IItemService _itemService;
    private readonly IMapper _mapper;

    public ItemController(IItemService itemService, IMapper mapper)
    {
        _itemService = itemService;
        _mapper = mapper;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Get([FromQuery] ItemSearchParameters itemParameters)
    {
        return Ok(await _itemService.Get(itemParameters));
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Get(int id)
    {
        var item = await _itemService.Get(id);
        return item != null ? Ok(item) : NotFound();
    }

    [HttpPost]
    [AuthorizeRoles(Role.User)]
    public async Task<IActionResult> Create(ItemDto itemDto)
    {
        var item = _mapper.Map<Item>(itemDto);
        var result = await _itemService.Create(item);
        return result != null ? Ok(result) : BadRequest();
    }

    [HttpPut]
    [AuthorizeRoles(Role.User)]
    public async Task<IActionResult> Update(ItemDto itemDto)
    {
        var item = _mapper.Map<Item>(itemDto);
        var result = await _itemService.Update(item);
        return result ? Ok() : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _itemService.Delete(id);
        return result ? Ok() : NotFound();
    }
}