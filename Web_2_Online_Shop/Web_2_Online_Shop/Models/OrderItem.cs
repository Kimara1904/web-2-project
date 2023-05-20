namespace Web_2_Online_Shop.Models
{
    public class OrderItem : EntityBase
    {
        public int ArticleId { get; set; }
        public virtual Article Article { get; set; } = null!;
        public int Amount { get; set; }
        public int OrderId { get; set; }
        public virtual Order Order { get; set; } = null!;
    }
}
