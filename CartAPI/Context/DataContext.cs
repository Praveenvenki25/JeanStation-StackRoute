using CartAPI.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace CartAPI.Context
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

        public IMongoCollection<Cart> Carts => database.GetCollection<Cart>("Carts");
        public IMongoCollection<Product> Products => database.GetCollection<Product>("Products");

    }
}
