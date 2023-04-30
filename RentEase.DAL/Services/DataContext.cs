using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RentEase.Domain.Models.Entities;

namespace RentEase.DAL.Services;

public class DataContext : IdentityDbContext<User>
{
    public DbSet<Item> Items { get; set; }
    
    public DbSet<Order> Orders { get; set; }
    
    public DataContext(DbContextOptions options) : base(options) 
    {
        Database.EnsureCreated();
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}