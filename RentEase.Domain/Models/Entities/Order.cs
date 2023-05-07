using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using RentEase.Domain.Models.Abstractions;

namespace RentEase.Domain.Models.Entities;

public class Order : BaseEntity
{
    public DateTime DateFrom { get; set; }
    
    public DateTime DateTo { get; set; }
    
    public string DeliveryAddress { get; set; }
    
    public bool IsConfirmed { get; set; }
    
    [NotMapped]
    public bool IsDelivered => IsConfirmed && DateFrom >= DateTime.Now && DateTo <= DateTime.Now ;
    
    public int ItemId { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Item Item { get; set; }
    
    public string TenantId { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public User Tenant { get; set; }
}