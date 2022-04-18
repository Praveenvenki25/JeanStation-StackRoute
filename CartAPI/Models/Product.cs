using MongoDB.Bson.Serialization.Attributes;

namespace CartAPI.Models
{
    public class Product
    {
        public string ProductId { get; set; }
        public float ProductQuantity { get; set; }
        public float ProductAmount { get; set; }
        public string ProductName { get; set; }
    }
}
