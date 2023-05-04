using RentEase.Domain.Enums;

namespace RentEase.API.DTOs;

public class ItemDto
{
    public int Id { get; set; }

    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public Category Category { get; set; }
    
    public int PriceUS { get; set; }
    
    public string Address { get; set; }
    
    public string ImageUrl { get; set; }
    
    public string LandlordId { get; set; } 
    
    public bool IsAvailable { get; set; }
}