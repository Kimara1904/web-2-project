﻿using Web_2_Online_Shop.Enums;

namespace Web_2_Online_Shop.Models
{
    public class Order : EntityBase
    {
        public virtual List<OrderItem> Items { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateTime DeliveryTime { get; set; }
        public string? Comment { get; set; }
        public OrderState State { get; set; }
        public virtual User? Buyer { get; set; }
        public int BuyerId { get; set; }
    }
}
