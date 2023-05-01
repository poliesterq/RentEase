using AutoMapper;
using RentEase.API.DTOs;
using RentEase.Domain.Models.Entities;

namespace RentEase.API.MappingProfiles;

public class ItemProfile : Profile
{
    public ItemProfile()
    {
        CreateMap<Item, ItemDto>().ReverseMap();
    }
}