using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RentEase.BLL.Abstractions;
using RentEase.Domain.Configurations;
using RentEase.Domain.Enums;
using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Request;
using RentEase.Domain.Models.Response;

namespace RentEase.BLL.Services;

public class IdentityService : IIdentityService
{
    private readonly ILogger<IdentityService> _logger;
    private readonly UserManager<User> _userManager;
    private readonly JwtOptions _jwtOptions;
    private readonly IChatService _chatService;

    public IdentityService(ILogger<IdentityService> logger,
        IChatService chatService,
        IOptions<JwtOptions> jwtOptions,
        UserManager<User> userManager)
    {
        _logger = logger;
        _userManager = userManager;
        _jwtOptions = jwtOptions.Value;
        _chatService = chatService;
    }

    public async Task<AuthenticationResult> Login(UserLoginModel user)
    {
        var identityUser = await _userManager.FindByEmailAsync(user.Email);

        if (identityUser != null)
        {
            var isValidPassword = await _userManager.CheckPasswordAsync(identityUser, user.Password);

            if (isValidPassword)
            {
                _logger.LogInformation("Successfully login");
                return await this.GenerateAuthenticationResult(identityUser);
            }
        }

        _logger.LogInformation("Login was failed");
        return new AuthenticationResult
        {
            Errors = new[] { "Incorrect data" }
        };
    }

    public async Task<AuthenticationResult> Registration(UserRegisterModel user)
    {
        var identityUser = await _userManager.FindByEmailAsync(user.Email);

        if (identityUser != null)
        {
            _logger.LogInformation("Registration was failed");
            return new AuthenticationResult
            {
                Errors = new[] { "User with this email address already exist" }
            };
        }

        var newUser = new User
        {
            Email = user.Email,
            UserName = user.Email,
            PhoneNumber = user.PhoneNumber,
            FirstName = user.FirstName,
            LastName = user.LastName
        };

        var createResult = await _userManager.CreateAsync(newUser, user.Password);

        if (!createResult.Succeeded)
        {
            _logger.LogInformation("Registration was failed");
            return new AuthenticationResult
            {
                Errors = createResult.Errors.Select(error => error.Description)
            };
        }

        var role = Enum.GetName(typeof(Role), Role.User);
        var addRoleResult = await _userManager.AddToRoleAsync(newUser, role);

        if (!addRoleResult.Succeeded)
        {
            _logger.LogInformation("Registration was failed");
            return new AuthenticationResult
            {
                Errors = addRoleResult.Errors.Select(error => error.Description)
            };
        }

        _logger.LogInformation("Successfully registration");
        return await this.GenerateAuthenticationResult(newUser);
    }

    public async Task<AuthenticationResult> Update(UserUpdateModel user)
    {
        var identityUser = await _userManager.FindByIdAsync(user.Id);

        if (identityUser == null)
        {
            _logger.LogInformation("Update was failed");
            return new AuthenticationResult
            {
                Errors = new[] { "User with this id doesn't exist" }
            };
        }

        identityUser.FirstName = user.FirstName;
        identityUser.LastName = user.LastName;
        identityUser.PhoneNumber = user.PhoneNumber;

        await _userManager.RemovePasswordAsync(identityUser);
        await _userManager.AddPasswordAsync(identityUser, user.Password);

        var result = await _userManager.UpdateAsync(identityUser);
        var chatUpdateResult = await _chatService.UpdateUser(new()
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName
        });

        if (!result.Succeeded || !chatUpdateResult)
        {
            _logger.LogInformation("Update was failed");
            return new AuthenticationResult
            {
                Errors = result.Errors.Select(error => error.Description)
            };
        }

        _logger.LogInformation("Successfully update");
        return await this.GenerateAuthenticationResult(identityUser);
    }
    
    private async Task<AuthenticationResult> GenerateAuthenticationResult(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtOptions.Secret);
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("id", user.Id),
        };

        var roles = await _userManager.GetRolesAsync(user);
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return new AuthenticationResult
        {
            Success = true,
            Token = tokenHandler.WriteToken(token)
        };
    }
}