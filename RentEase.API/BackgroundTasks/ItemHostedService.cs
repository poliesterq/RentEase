using RentEase.BLL.Abstractions;

namespace RentEase.API.BackgroundTasks;

public class ItemHostedService : IHostedService, IDisposable

{
    private Timer _timer;
    private readonly ILogger<ItemHostedService> _logger;
    private readonly IServiceProvider _services;

    public ItemHostedService(ILogger<ItemHostedService> logger, IServiceProvider services)
    {
        _logger = logger;
        _services = services;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("ItemHostedService running.");
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(15));
        return Task.CompletedTask;
    }

    private async void DoWork(object state)
    {
        using (var scope = _services.CreateScope())
        {
            var itemService =
                scope.ServiceProvider
                    .GetRequiredService<IItemService>();

            await itemService.UpdateStatus();
        }    
        
        _logger.LogInformation("ItemHostedService is working.");
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("ItemHostedService is stopping.");
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}