namespace RentEase.Domain.Configurations;

public class JwtOptions
{
    public const string SectionName = "JwtSettings";

    public string Secret { get; set; }
}