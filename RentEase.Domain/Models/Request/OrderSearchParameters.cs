namespace RentEase.Domain.Models.Request;

public class OrderSearchParameters
{
    public string? SearchParameter { get; set; }
    
    public DateTime? DateFrom { get; set; }
    
    public DateTime? DateTo { get; set; }
    
    public bool? IsConfirmed { get; set; }
    
    public int? ItemId { get; set; }
    
    public string? LandlordId { get; set; }
   
    public string? TenantId { get; set; }
}