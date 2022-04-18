using Microsoft.EntityFrameworkCore;
using ProductAPI.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject
{
    public class DatabaseFixture1 : IDisposable
    {
        public DataContext db1;

        public DatabaseFixture1()
        {
            var option1 = new DbContextOptionsBuilder<DataContext>().UseInMemoryDatabase("ProductDB").Options;
            db1 = new DataContext(option1);

        }
        public void Dispose()
        {
            db1 = null;
        }
    }
}
