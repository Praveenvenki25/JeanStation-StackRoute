using DiscountsAPI.Exceptions;
using DiscountsAPI.Models;
using DiscountsAPI.Respository;
using System.Collections.Generic;

namespace DiscountsAPI.Services
{
    public class DiscountsService : IDiscountsService
    {
        private readonly IDiscountsRepository discountsRepository;

        public DiscountsService(IDiscountsRepository discountsRepository)
        {
            this.discountsRepository = discountsRepository;
        }
        public int AddDiscountDetails(Discount discount)
        {
            Discount existingDiscount = discountsRepository.GetDiscountDetailsById(discount.CouponCode);
            if(existingDiscount == null)
                return discountsRepository.AddDiscountDetails(discount);
            throw new DiscountAlreadyExistsException($"Discount with discount id {discount.DiscountId} and coupon code {discount.CouponCode} already exists");
        }

        public int DeleteDiscountDetailsById(string discountId)
        {
            Discount existingDiscount = discountsRepository.GetDiscountDetailsById(discountId);
            if(existingDiscount != null)
                return discountsRepository.DeleteDiscountDetailsById(discountId);
            throw new DiscountNotFoundException($"Discount with discount id {discountId} does not exists");
        }

        public List<Discount> GetDiscountDetails()
        {
            return discountsRepository.GetDiscountDetails();
        }

        public Discount GetDiscountDetailsById(string discountId)
        {
            Discount existingDiscount = discountsRepository.GetDiscountDetailsById(discountId);
            if (existingDiscount != null)
                return existingDiscount;
            throw new DiscountNotFoundException($"Discount with discount id {discountId} does not exists");
        }

        public Discount GetDiscountDetailsByCouponCode(string couponCode)
        {
            Discount existingDiscount = discountsRepository.GetDiscountDetailsByCouponCode(couponCode);
            if (existingDiscount != null)
                return existingDiscount;
            throw new DiscountNotFoundException($"Discount with coupon code {couponCode} does not exists");
        }

        public int UpdateDiscountDetailsByCouponCode(string couponCode, Discount discount)
        {
            Discount existingDiscount = discountsRepository.GetDiscountDetailsByCouponCode(couponCode);
            if( existingDiscount != null)
                return discountsRepository.UpdateDiscountDetailsByCouponCode(couponCode, discount);
            throw new DiscountNotFoundException($"Discount with coupon code {couponCode} does not exists");
        }
    }
}
