using RentEase.Domain.Enums;

namespace RentEase.Domain.Models.Request;

public class ItemSearchParameters
{
    public string? SearchParameter { get; set; }
    
    public List<Category>? Categories { get; set; }
    
    public string? Address { get; set; }
    
    public int? PriceMinUS { get; set; }
    
    public int? PriceMaxUS { get; set; }
    
    //public int? PriceMinUA { get; set; }
    
    //public int? PriceMaxUA { get; set; }
    
    public string? LandlordId { get; set; }
    
    public bool? IsAvailable { get; set; }
}