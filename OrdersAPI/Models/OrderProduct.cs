using MongoDB.Bson.Serialization.Attributes;

namespace OrdersAPI.Models
{
    public class OrderProduct
    {
        
        public string ProductId { get; set; }
        public int ProductQuantity { get; set; }
        public float ProductAmount { get; set; }

    }
}
