namespace Web_2_Online_Shop.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public List<ItemDTO> Items { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string? Comment { get; set; }
        public DateTime DeliveryTime { get; set; }
        public string State { get; set; } = null!;
    }
}
