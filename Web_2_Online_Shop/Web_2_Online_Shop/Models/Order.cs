namespace Web_2_Online_Shop.Models
{
    public class Order : EntityBase
    {
        public List<OrderItem> Articles { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateTime DeliveryTime { get; set; }
        public string? Comment { get; set; }
        public User? Buyer { get; set; }
        public int BuyerId { get; set; }
    }
}
