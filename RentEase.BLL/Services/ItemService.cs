using System.Linq.Expressions;
using Microsoft.Extensions.Logging;
using RentEase.BLL.Abstractions;
using RentEase.DAL.Abstractions;
using RentEase.Domain.Models.Entities;
using RentEase.Domain.Models.Request;
using RentEase.Domain.Extensions;

namespace RentEase.BLL.Services;

public class ItemService : IItemService
{
    private readonly ILogger<ItemService> _logger;
    private readonly IGenericRepository<Item> _itemRepository;

    public ItemService(
        ILogger<ItemService> logger,
        IGenericRepository<Item> itemRepository)
    {
        _logger = logger;
        _itemRepository = itemRepository;
    }

    public async Task<IEnumerable<Item>> Get(ItemSearchParameters itemParameters)
    {
        Expression<Func<Item, bool>> itemCondition = item => true;

        if (itemParameters.Categories != null)
        {
            itemCondition = itemCondition.AndAlso(item => itemParameters.Categories.Contains(item.Category));
        }

        if (itemParameters.PriceMaxUS != null)
        {
            itemCondition = itemCondition.AndAlso(item => item.PriceUS <= itemParameters.PriceMaxUS);
        }

        if (itemParameters.PriceMinUS != null)
        {
            itemCondition = itemCondition.AndAlso(item => item.PriceUS >= itemParameters.PriceMinUS);
        }

        if (itemParameters.LandlordId != null)
        {
            itemCondition = itemCondition.AndAlso(item => item.LandlordId == itemParameters.LandlordId);
        }

        if (itemParameters.IsAvailable != null)
        {
            itemCondition = itemCondition.AndAlso(item => item.IsAvailable == itemParameters.IsAvailable);
        }

        //TODO:: Address full text search 

        var items = await _itemRepository.Get(
            itemCondition,
            new()
            {
                item => item.Landlord,
            },
            itemParameters.SearchParameter);

        _logger.LogInformation("Items were got");
        return items;
    }

    public async Task<Item?> Get(int id)
    {
        var item = await _itemRepository.Get(
            id,
            item => item.Orders,
            new()
            {
                item => item.Landlord
            });

        var logInformation = item == null
            ? $"Item with id = {id} wasn't got"
            : $"Item with id = {id} was got";
        _logger.LogInformation(logInformation);
        return item;
    }

    public async Task<Item?> Create(Item item)
    {
        var itemResult = await _itemRepository.Create(item);

        var logInformation = itemResult == null
            ? "Item wasn't created"
            : $"Item with id = {itemResult.Id} was created";
        _logger.LogInformation(logInformation);
        return itemResult;
    }

    public async Task<bool> Update(Item item)
    {
        var result = await _itemRepository.Update(item);

        var logInformation = result
            ? $"Item with id = {item.Id} wasn't updated"
            : $"item with id = {item.Id} was updated";
        _logger.LogInformation(logInformation);
        return result;
    }

    public async Task<bool> Delete(int id)
    {
        var result = await _itemRepository.Delete(id);

        var logInformation = result
            ? $"Item with id = {id} wasn't deleted"
            : $"Item with id = {id} was deleted";
        _logger.LogInformation(logInformation);
        return result;
    }

    public async Task UpdateStatus()
    {
        var items = await _itemRepository.Get(filter: item => true, new()
        {
            item => item.Orders
        });

        foreach (var item in items)
        {
            if (item.Orders.Any(order => 
                    order.DateFrom >= DateTime.Today && order.DateTo <= DateTime.Today) 
                    && item.IsAvailable)
            {
                item.IsAvailable = false;
                await _itemRepository.Update(item);
            }
            else if (item.Orders.Any(order =>
                         !(order.DateFrom >= DateTime.Today && order.DateTo <= DateTime.Today)
                         && !item.IsAvailable))
            {
                item.IsAvailable = true;
                await _itemRepository.Update(item);
            }
        }
    }
}