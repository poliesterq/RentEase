namespace RentEase.Domain.Models.Request;

public class UserUpdateModel
{
    public string Id { get; set; }

    public string LastName { get; set; }

    public string FirstName { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public string Password { get; set; }
}