using System.Text.Json.Serialization;
using RentEase.Domain.Models.Abstractions;

namespace RentEase.Domain.Models.Entities;

public class Order : BaseEntity
{
    public DateTime DateFrom { get; set; }
    
    public DateTime DateTo { get; set; }
    
    public string DeliveryAdress { get; set; }
    
    public bool IsConfirmed { get; set; }
    
    public int ItemId { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Item Item { get; set; }
    
    public string TenantId { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public User Tenant { get; set; }
}