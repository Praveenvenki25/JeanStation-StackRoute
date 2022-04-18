using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using OrdersAPI.Models;

namespace OrdersAPI.Context
{
    public class DataContext
    {
        MongoClient client;
        IMongoDatabase database;

        public DataContext(IConfiguration config)
        {
            client = new MongoClient(config.GetConnectionString("DbConnection"));
            database = client.GetDatabase(config.GetSection("DatabaseName").Value);
        }

        public IMongoCollection<Order> Orders => database.GetCollection<Order>("Orders");
        public IMongoCollection<OrderProduct> Products => database.GetCollection<OrderProduct>("Products");
        public IMongoCollection<OrderStatus> Statuses => database.GetCollection<OrderStatus>("Statuses");
    }
}
