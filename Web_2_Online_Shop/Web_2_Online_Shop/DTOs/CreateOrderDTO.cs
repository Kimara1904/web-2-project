namespace Web_2_Online_Shop.DTOs
{
    public class CreateOrderDTO
    {
        public List<CreateItemDTO> Items { get; set; } = null!;
        public string DeliveryAddress { get; set; } = null!;
        public string? Comment { get; set; }
    }
}
