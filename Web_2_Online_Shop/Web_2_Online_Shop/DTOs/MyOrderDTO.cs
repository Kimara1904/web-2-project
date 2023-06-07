namespace Web_2_Online_Shop.DTOs
{
    public class MyOrderDTO
    {
        public int Id { get; set; }
        public List<ItemDTO> Items { get; set; } = null!;
        public double DeliveryPrice = 100.00;
        public string Address { get; set; } = null!;
        public string? Comment { get; set; }
        public DateTime DeliveryTime { get; set; }
        public bool IsCancled { get; set; }
    }
}
