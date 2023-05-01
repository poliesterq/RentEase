using RentEase.Domain.Models.Entities;

namespace RentEase.Domain.Models.Response;

public class OrderStatistic
{
    public DateTime DateFrom { get; set; }
    
    public DateTime DateTo { get; set; }
    
    public List<Order> Orders { get; set; }
}