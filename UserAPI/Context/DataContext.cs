using Microsoft.EntityFrameworkCore;
using UserAPI.Models;

namespace UserAPI.Context
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Address { get; set; }


    }
}
