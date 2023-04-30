using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentEase.API.Attributes;
using RentEase.BLL.Abstractions;
using RentEase.Domain.Enums;
using RentEase.Domain.Models.Chat;
using RentEase.Domain.Models.Request;

namespace RentEase.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[AuthorizeRoles(Role.User)]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpGet("All")]
    public async Task<IActionResult> Get()
    {
        var userId = User.Claims.FirstOrDefault(claim => claim.Type == "id")?.Value;
        return Ok(await _chatService.Get(userId));
    }

    [HttpGet("{chatId}")]
    public async Task<IActionResult> Get(string chatId)
    {
        var userId = User.Claims.FirstOrDefault(claim => claim.Type == "id")?.Value;
        var chat = await _chatService.Get(chatId, userId);
        return chat != null ? Ok(chat) : NotFound();
    }

    [HttpGet("CountUnread")]
    public async Task<IActionResult> CountUnread()
    {
        var userId = User.Claims.FirstOrDefault(claim => claim.Type == "id")?.Value;
        return Ok(await _chatService.CountUnread(userId));
    }

    [HttpPost]
    public async Task<IActionResult> Create(Chat chat)
    {
        var result = await _chatService.Create(chat);
        return result != null ? Ok(result) : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _chatService.Delete(id);
        return result ? Ok() : NotFound();
    }

    [HttpPut]
    [Route("LeaveChat/{chatId}")]
    public async Task<IActionResult> LeaveChat(string chatId)
    {
        var userId = User.Claims.FirstOrDefault(claim => claim.Type == "id")?.Value;
        var result = await _chatService.LeaveChat(chatId, userId);
        return result ? Ok() : NotFound();
    }

    [HttpPut]
    [Route("SendMessage")]
    public async Task<IActionResult> SendMessage(SendMessageModel message)
    {
        var result = await _chatService.SendMessage(message);
        return result != null ? Ok(result) : NotFound();
    }

    [HttpPut]
    [Route("DeleteMessage")]
    public async Task<IActionResult> DeleteMessage(DeleteMessageModel message)
    {
        var result = await _chatService.DeleteMessage(message);
        return result != null ? Ok(result) : NotFound();
    }
}