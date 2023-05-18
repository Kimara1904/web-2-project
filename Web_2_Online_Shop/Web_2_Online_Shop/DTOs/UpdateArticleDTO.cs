namespace Web_2_Online_Shop.DTOs
{
    public class UpdateArticleDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }
    }
}
