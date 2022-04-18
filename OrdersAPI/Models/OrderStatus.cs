using MongoDB.Bson.Serialization.Attributes;

namespace OrdersAPI.Models
{
    public class OrderStatus
    {
        [BsonId]
        public int Id { get; set; }
        public string Status { get; set; }
    }
}
