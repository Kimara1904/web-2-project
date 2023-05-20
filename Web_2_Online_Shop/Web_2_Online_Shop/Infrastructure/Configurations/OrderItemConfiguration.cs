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
            builder.HasOne(oi => oi.Order).WithMany(o => o.Items).HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(oi => oi.Article).WithMany(a => a.Items).HasForeignKey(oi => oi.ArticleId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(a => a.IsDeleted).HasDefaultValue(false);
            builder.HasQueryFilter(oi => !oi.IsDeleted);
        }
    }
}
