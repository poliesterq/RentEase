using AutoMapper;
using RentEase.API.DTOs;
using RentEase.Domain.Models.Entities;

namespace RentEase.API.MappingProfiles;

public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderDto>().ReverseMap();
    }
}