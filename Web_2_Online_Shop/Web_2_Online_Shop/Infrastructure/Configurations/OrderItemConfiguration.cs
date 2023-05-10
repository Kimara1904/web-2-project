using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Infrastructure.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(oi => oi.Id);
            builder.HasOne(oi => oi.Order).WithMany(o => o.Articles).HasForeignKey(oi => oi.OrderId);
            builder.Property(a => a.IsDeleted).HasDefaultValue(false);
        }
    }
}
