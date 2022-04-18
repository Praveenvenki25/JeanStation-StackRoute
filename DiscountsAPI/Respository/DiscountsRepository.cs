using DiscountsAPI.Context;
using DiscountsAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace DiscountsAPI.Respository
{
    public class DiscountsRepository : IDiscountsRepository
    {
        private readonly DataContext context;

        public DiscountsRepository(DataContext context)
        {
            this.context = context;
        }

        public int AddDiscountDetails(Discount discount)
        {
            context.Discounts.Add(discount);
            return context.SaveChanges();
        }

        public int DeleteDiscountDetailsById(string discountId)
        {
            Discount discount = context.Discounts.Where(d => d.DiscountId == discountId).FirstOrDefault();  
            context.Discounts.Remove(discount);
            return context.SaveChanges();
        }

        public List<Discount> GetDiscountDetails()
        {
            return context.Discounts.ToList();
        }

        public Discount GetDiscountDetailsByCouponCode(string couponCode)
        {
            return context.Discounts.Where(d => d.CouponCode == couponCode).FirstOrDefault();
        }

        public Discount GetDiscountDetailsById(string discountId)
        {
            return context.Discounts.Where(d => d.DiscountId == discountId).FirstOrDefault();
        }

        public int UpdateDiscountDetailsByCouponCode(string couponCode, Discount discount)
        {
            Discount updatedDiscount = context.Discounts.Where(d => d.CouponCode == couponCode).FirstOrDefault();
            updatedDiscount.CouponCode = discount.CouponCode;
            updatedDiscount.IsActive = discount.IsActive;
            updatedDiscount.ExpiryDate = discount.ExpiryDate;
            updatedDiscount.DiscountPercentage = discount.DiscountPercentage;
            context.Entry<Discount>(updatedDiscount).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return context.SaveChanges();
        }
    }
}
