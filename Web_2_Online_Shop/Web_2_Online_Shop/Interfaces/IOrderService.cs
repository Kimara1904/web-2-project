using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IOrderService
    {
        Task<MyOrderDTO> Create(CreateOrderDTO orderDTO, int id);
        Task Cancel(int id, int buyerId);
        Task<List<MyOrderDTO>> GetAllMy(int id);
        Task<List<OrderDTO>> GetAll();
        Task<List<OrderDTO>> GetAllDeliveredForSeller(int id);
        Task<List<OrderDTO>> GetAllInDeliveryForSeller(int id);
    }
}
