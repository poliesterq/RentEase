using RentEase.Domain.Enums;

namespace RentEase.Domain.Models.Response;

public class CategoryStatistic
{
    public Category Category { get; set; }
    
    public int Count { get; set; }
}