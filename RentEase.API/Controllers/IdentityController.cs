using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentEase.BLL.Abstractions;
using RentEase.Domain.Models.Request;

namespace RentEase.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class IdentityController : ControllerBase
{
    private readonly IIdentityService _identityService;
        
    public IdentityController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    [HttpPost]
    [Route("Login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(UserLoginModel user)
    {
        var result = await _identityService.Login(user);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost]
    [Route("Registration")]
    [AllowAnonymous]
    public async Task<IActionResult> Registration(UserRegisterModel user)
    {
        var result = await _identityService.Registration(user);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPut]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Update(UserUpdateModel user)
    {
        var result = await _identityService.Update(user);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}