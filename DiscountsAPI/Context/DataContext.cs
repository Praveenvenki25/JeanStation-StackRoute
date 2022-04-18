using DiscountsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DiscountsAPI.Context
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Discount> Discounts { get; set; }
    }
}
