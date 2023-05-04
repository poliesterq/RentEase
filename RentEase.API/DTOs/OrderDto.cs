namespace RentEase.API.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    
    public DateTime DateFrom { get; set; }
    
    public DateTime DateTo { get; set; }
    
    public string DeliveryAddress { get; set; }
    
    public bool IsConfirmed { get; set; }
    
    public int ItemId { get; set; }
    
    public string TenantId { get; set; }
}