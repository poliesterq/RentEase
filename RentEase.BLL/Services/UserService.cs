using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using RentEase.BLL.Abstractions;
using RentEase.Domain.Enums;
using RentEase.Domain.Models.Entities;

namespace RentEase.BLL.Services;

public class UserService : IUserService
{
    private readonly ILogger<UserService> _logger;
    private readonly UserManager<User> _userManager;

    public UserService(ILogger<UserService> logger, UserManager<User> userManager)
    {
        _logger = logger;
        _userManager = userManager;
    }

    public async Task<IEnumerable<User>> Get(List<Role> roles = null)
    {
        List<User> result = new();

        if (roles != null && roles.Any())
        {
            foreach (var role in roles)
            {
                result.AddRange(await _userManager.GetUsersInRoleAsync(Enum.GetName(typeof(Role), role)));
            }
        }
        else
        {
            result = _userManager.Users.ToList();
        }

        foreach (var user in result)
        {
            user.Roles = await _userManager.GetRolesAsync(user);
        }

        _logger.LogInformation("Users were got");
        return result;
    }

    public async Task<User?> Get(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
        {
            _logger.LogInformation($"User with id = {id} wasn't got");
            return null;
        }

        user.Roles = await _userManager.GetRolesAsync(user);
        _logger.LogInformation($"User with id = {id} was got");
        return user;
    }

    public async Task<bool> Delete(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
        {
            _logger.LogInformation($"User with id = {id} wasn't deleted");
            return false;
        }

        var result = await _userManager.DeleteAsync(user);
        var logInformation = result.Succeeded
            ? $"User with id = {id} was deleted"
            : $"User with id = {id} wasn't deleted";
        _logger.LogInformation(logInformation);

        return result.Succeeded;
    }
}