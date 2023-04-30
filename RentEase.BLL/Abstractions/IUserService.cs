using RentEase.Domain.Enums;
using RentEase.Domain.Models.Entities;

namespace RentEase.BLL.Abstractions;

public interface IUserService
{
    public Task<IEnumerable<User>> Get(List<Role> roles);

    public Task<User?> Get(string id);

    public Task<bool> Delete(string id);
}