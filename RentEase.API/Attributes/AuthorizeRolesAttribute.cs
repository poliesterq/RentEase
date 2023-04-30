using Microsoft.AspNetCore.Authorization;
using RentEase.Domain.Enums;

namespace RentEase.API.Attributes;

public class AuthorizeRolesAttribute : AuthorizeAttribute
{
    public AuthorizeRolesAttribute(params Role[] roles)
    {
        var rolesAsStrings = roles.Select(role => Enum.GetName(typeof(Role), role));
        Roles = string.Join(",", rolesAsStrings);    }
}