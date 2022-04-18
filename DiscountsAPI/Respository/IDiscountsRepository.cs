using DiscountsAPI.Context;
using DiscountsAPI.Models;
using System.Collections.Generic;

namespace DiscountsAPI.Respository
{
    public interface IDiscountsRepository
    {
        public List<Discount> GetDiscountDetails();
        public Discount GetDiscountDetailsById(string discountId);
        public Discount GetDiscountDetailsByCouponCode(string couponCode);
        public int AddDiscountDetails(Discount discount);
        public int UpdateDiscountDetailsByCouponCode(string couponCode, Discount discount);
        public int DeleteDiscountDetailsById(string discountId);
    }
}
