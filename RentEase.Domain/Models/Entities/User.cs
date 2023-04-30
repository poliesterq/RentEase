using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace RentEase.Domain.Models.Entities;

public class User : IdentityUser
{
    public string LastName { get; set; }

    public string FirstName { get; set; }

    public DateTime BirthDate { get; set; }

    [NotMapped]
    public IEnumerable<string> Roles { get; set; }
}