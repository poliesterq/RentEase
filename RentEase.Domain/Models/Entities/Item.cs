using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using RentEase.Domain.Enums;
using RentEase.Domain.Models.Abstractions;

namespace RentEase.Domain.Models.Entities;

public class Item : BaseEntity
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public Category Category { get; set; }
    
    public int PriceUS { get; set; }

    [NotMapped]
    public int PriceUA => PriceUS * 36;
    
    public string Address { get; set; }
    
    public string ImageUrl { get; set; }
    
    // public string Longitude { get; set; }
    //
    // public string Latitude { get; set; }
    
    public string LandlordId { get; set; } 
    
    public bool IsAvailable { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public User Landlord { get; set; }
    
    public List<Order> Orders { get; set; }
}