using RentEase.Domain.Enums;

namespace RentEase.Domain.Models.Response;

public class ExpenseStatistic
{
    public Category Category { get; set; }
    
    public int ExpenseUS { get; set; }
    
    public int ExpenseUA { get; set; }
}