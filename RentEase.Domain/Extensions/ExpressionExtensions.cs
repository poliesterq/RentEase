using System.Linq.Expressions;

namespace RentEase.Domain.Extensions;

public static class ExpressionExtensions
{
    public static Expression<Func<T, bool>> AndAlso<T>(this Expression<Func<T, bool>> left, Expression<Func<T, bool>> right)
    {
        var parameters = left.Parameters[0];

        if (ReferenceEquals(parameters, right.Parameters[0]))
        {
            return Expression.Lambda<Func<T, bool>>(Expression.AndAlso(left.Body, right.Body), parameters);
        }

        return Expression.Lambda<Func<T, bool>>(
            Expression.AndAlso(left.Body, Expression.Invoke(right, parameters)), parameters);
    }
}