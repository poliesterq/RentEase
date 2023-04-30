using RentEase.Domain.Models.Request;
using RentEase.Domain.Models.Response;

namespace RentEase.BLL.Abstractions;

public interface IIdentityService
{
    public Task<AuthenticationResult> Login(UserLoginModel user);

    public Task<AuthenticationResult> Registration(UserRegisterModel user);

    public Task<AuthenticationResult> Update(UserRegisterModel user);
}