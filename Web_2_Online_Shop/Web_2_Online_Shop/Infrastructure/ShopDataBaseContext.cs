using Microsoft.EntityFrameworkCore;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Infrastructure
{
    public class ShopDataBaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }

        public ShopDataBaseContext(DbContextOptions<ShopDataBaseContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShopDataBaseContext).Assembly);
        }
    }
}
