using Microsoft.EntityFrameworkCore;
using WishlistAPI.Models;

namespace WishlistAPI.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Wishlist> Wishlists { get; set; }

    }
}
