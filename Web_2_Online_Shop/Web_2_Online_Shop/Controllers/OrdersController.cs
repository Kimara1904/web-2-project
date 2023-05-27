using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Interfaces;

namespace Web_2_Online_Shop.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetAll()
        {
            var ret = await _orderService.GetAll();
            return Ok(ret);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("customer/delivered")]
        public async Task<ActionResult<List<MyOrderDTO>>> GetAllMy()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.GetAllMyDelivered(id);

            return Ok(ret);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpGet("seller/delivered")]
        public async Task<ActionResult<List<OrderDTO>>> GetAllDelivered()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.GetAllDeliveredForSeller(id);

            return Ok(ret);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpGet("seller/in-delivery")]
        public async Task<ActionResult<List<OrderDTO>>> GetAllInDelivery()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.GetAllInDeliveryForSeller(id);

            return Ok(ret);
        }

        [Authorize(Roles = "Customer")]
        [HttpPost]
        public async Task<ActionResult<MyOrderDTO>> Create(CreateOrderDTO orderDTO)
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.Create(orderDTO, id);

            return Ok(ret);
        }

        [Authorize(Roles = "Customer")]
        [HttpPut("{id:int}")]
        public async Task<ActionResult<OrderDTO>> Cancle(int id)
        {
            var buyerId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            await _orderService.Cancle(id, buyerId);

            return Ok(string.Format("Successfully cancled order with id: {0}", id));
        }
    }
}
