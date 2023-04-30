namespace RentEase.Domain.Configurations;

public class MongoOptions
{
    public const string SectionName = "MongoSettings";

    public string ConnectionString { get; set; }

    public string DatabaseName { get; set; }

    public string ChatCollection { get; set; }
}