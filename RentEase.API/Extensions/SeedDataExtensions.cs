using Microsoft.AspNetCore.Identity;
using RentEase.Domain.Enums;
using RentEase.Domain.Models.Entities;

namespace RentEase.API.Extensions;

public static class SeedDataExtensions
{
    public static async void SeedRoles(this WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var roleManager = (RoleManager<IdentityRole>)scope.ServiceProvider
                .GetService(typeof(RoleManager<IdentityRole>));
            var roles = Enum.GetNames(typeof(Role));
            
            foreach (var role in roles)
            {
                var exits = await roleManager.RoleExistsAsync(role);

                if (!exits)
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
    }

    public static async void SeedAdministrator(this WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var userManager = (UserManager<User>)scope.ServiceProvider
                .GetService(typeof(UserManager<User>));

            var adminUser = new User
            {
                FirstName = "Administrator",
                LastName = "",
                UserName = "admin@admin.com",
                Email = "admin@admin.com"
            };

            var exists = await userManager.FindByEmailAsync(adminUser.Email);

            if (exists == null)
            {
                await userManager.CreateAsync(adminUser, "Password123)");
            }

            var role = Enum.GetName(typeof(Role), Role.Admin);
            var adminInRole = await userManager.IsInRoleAsync(adminUser, role);

            if (!adminInRole)
            {
                await userManager.AddToRoleAsync(adminUser, role);
            }
        }
    }
}