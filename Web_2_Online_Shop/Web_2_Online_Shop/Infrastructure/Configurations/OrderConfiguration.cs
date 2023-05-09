using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Address).HasMaxLength(40).IsRequired();
            builder.Property(o => o.DeliveryTime).IsRequired();
            builder.HasMany(o => o.Articles).WithOne(oi => oi.Order).HasForeignKey(o => o.ArticleId);
        }
    }
}
