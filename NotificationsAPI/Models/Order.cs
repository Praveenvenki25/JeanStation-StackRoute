using System;
using System.Collections.Generic;

namespace NotificationsAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public List<OrderProduct> Products { get; set; }
        public DateTime OrderDatetime { get; set; }
        public string AddressId { get; set; }
        public float TotalPrice { get; set; }
        public float DiscountPrice { get; set; }
        public string CouponCode { get; set; }
        public string OrderStatus { get; set; }
    }
}
