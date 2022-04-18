using Microsoft.EntityFrameworkCore;
using NotificationsAPI.Models;

namespace NotificationsAPI.Context
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
            Database.EnsureCreated();   
        }
        public DbSet<Notification> Notifications { get; set; } 
    }
}
