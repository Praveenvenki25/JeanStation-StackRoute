using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.Collections.Generic;

namespace CartAPI.Models
{
    public class Cart
    {
        [BsonId]
        public int Id { get; set; }
        public string CartId { get; set; }
        public string UserId { get; set; }
        public float TotalAmount { get; set; }
        public List<Product> Products { get; set; }
        public float AmountToBePaid { get; set; }
        public float GST { get; set; }
        public bool IsActive { get; set; }
        public float DiscountedAmount { get; set; }
        public string CouponCode { get; set; }
    }
}
