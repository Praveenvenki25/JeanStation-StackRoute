using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WishlistAPI.Context;

namespace TestProject
{
    public class DatabaseFixture : IDisposable
    {
        public DataContext db;

        public DatabaseFixture()
        {
            var options = new DbContextOptionsBuilder<DataContext>().UseInMemoryDatabase("WishlistDB").Options;
            db = new DataContext(options);

        }
        public void Dispose()
        {
            db = null;
        }
    }
}
