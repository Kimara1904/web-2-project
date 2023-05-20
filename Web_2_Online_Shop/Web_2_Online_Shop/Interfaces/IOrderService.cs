using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDTO> Create(CreateOrderDTO orderDTO, int id);
        Task Cancle(int id, int buyerId);
        Task<List<OrderDTO>> GetAllMyDelivered(int id);
        Task<List<OrderDTO>> GetAll();
        Task<List<OrderDTO>> GetAllDeliveredForSeller(int id);
        Task<List<OrderDTO>> GetAllInDeliveryForSeller(int id);
    }
}
