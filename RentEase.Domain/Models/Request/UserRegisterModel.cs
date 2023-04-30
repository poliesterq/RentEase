namespace RentEase.Domain.Models.Request;

public class UserRegisterModel
{
    public string Id { get; set; }

    public string LastName { get; set; }

    public string FirstName { get; set; }
    
    public string PhoneNumber { get; set; }

    public string Email { get; set; }
    
    public DateTime BirthDate { get; set; }

    public string Password { get; set; }
}