using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.ExceptionHandler.Exceptions;
using Web_2_Online_Shop.Interfaces;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        public OrderService(IRepositoryWrapper repositoryWrapper, IMapper mapper)
        {
            _repository = repositoryWrapper;
            _mapper = mapper;
        }

        public async Task Cancle(int id, int buyerId)
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var order = ordersQuery.Include(o => o.Items).ThenInclude(i => i.Article).Where(o => o.Id == id && !o.IsCancled && o.DeliveryTime > DateTime.Now).FirstOrDefault() ??
                throw new NotFoundException(string.Format("Order with id: {0} in delivery process doesn't exit.", id));

            foreach (var item in order.Items)
            {
                item.Article.Amount += item.Amount;
                _repository._articleRepository.Update(item.Article);
            }

            order.IsCancled = true;

            _repository._orderRepository.Update(order);
            await _repository.SaveChanges();
        }

        public async Task<MyOrderDTO> Create(CreateOrderDTO orderDTO, int id)
        {
            var order = _mapper.Map<Order>(orderDTO);
            order.BuyerId = id;
            order.DeliveryTime = DateTime.Now.AddHours(1).AddMinutes(new Random().Next(60));

            foreach (var item in order.Items)
            {
                var article = await _repository._articleRepository.FindAsync(item.ArticleId) ??
                    throw new NotFoundException(string.Format("There is no article with id: {0}", item.ArticleId));

                if (article.Amount < item.Amount)
                {
                    throw new BadRequestException(string.Format("There is no enougt product: {0} for your order.", article.Name));
                }

                article.Amount -= item.Amount;
                item.ArticleId = article.Id;

                _repository._articleRepository.Update(article);
            }

            await _repository._orderRepository.Insert(order);
            await _repository.SaveChanges();

            return _mapper.Map<MyOrderDTO>(order);
        }

        public async Task<List<OrderDTO>> GetAll()
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var orders = ordersQuery.Include(o => o.Items).ThenInclude(i => i.Article).Include(o => o.Buyer).ToList();

            return _mapper.Map<List<Order>, List<OrderDTO>>(orders);
        }

        public async Task<List<OrderDTO>> GetAllDeliveredForSeller(int id)
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var orders = ordersQuery.Include(o => o.Items).ThenInclude(i => i.Article)
                .Where(o => o.Items.Any(i => i.Article.SellerId == id) && o.DeliveryTime <= DateTime.Now && !o.IsCancled).ToList();

            return _mapper.Map<List<Order>, List<OrderDTO>>(orders);
        }

        public async Task<List<OrderDTO>> GetAllInDeliveryForSeller(int id)
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var orders = ordersQuery.Include(o => o.Items).ThenInclude(i => i.Article)
                .Where(o => o.Items.Any(i => i.Article.SellerId == id) && o.DeliveryTime > DateTime.Now && !o.IsCancled).ToList();
            return _mapper.Map<List<Order>, List<OrderDTO>>(orders);
        }

        public async Task<List<MyOrderDTO>> GetAllMy(int id)
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var orders = ordersQuery.Include(o => o.Items).ThenInclude(i => i.Article).Where(o => o.BuyerId == id && !o.IsCancled).ToList();

            return _mapper.Map<List<Order>, List<MyOrderDTO>>(orders);
        }
    }
}
