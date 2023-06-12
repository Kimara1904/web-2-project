﻿using AutoMapper;
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

        public async Task Cancel(int id, int buyerId)
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var order = ordersQuery.Include(o => o.Items).Where(o => o.Id == id && !o.IsCanceled && (o.DeliveryTime - DateTime.Now).TotalHours > 1).FirstOrDefault() ??
                throw new NotFoundException(string.Format("Order with id: {0} in delivery process doesn't exist.", id));

            foreach (var item in order.Items)
            {
                var article = await _repository._articleRepository.FindAsync(item.ArticleId);
                if (article == null)
                {
                    continue;
                }

                article.Amount += item.Amount;
                _repository._articleRepository.Update(article);
            }

            order.IsCanceled = true;

            _repository._orderRepository.Update(order);
            await _repository.SaveChanges();
        }

        public async Task<MyOrderDTO> Create(CreateOrderDTO orderDTO, int id)
        {
            var articleQuery = await _repository._articleRepository.GetAllAsync();
            var order = _mapper.Map<Order>(orderDTO);
            order.BuyerId = id;
            order.DeliveryTime = DateTime.Now.AddHours(1).AddMinutes(new Random().Next(60));

            foreach (var item in order.Items)
            {
                var article = articleQuery.Where(a => a.Id == item.ArticleId).FirstOrDefault() ??
                    throw new NotFoundException(string.Format("There is no article with id: {0}", item.ArticleId));

                if (article.Amount < item.Amount)
                {
                    throw new BadRequestException(string.Format("There is no enougt product: {0} for your order.", article.Name));
                }

                article.Amount -= item.Amount;
                item.ArticleId = article.Id;
                item.ArticlePrice = article.Price;
                item.ArticleName = article.Name;

                _repository._articleRepository.Update(article);
            }
            var ordersArticles = articleQuery.Where(a => order.Items.Select(i => i.ArticleId).Contains(a.Id)).ToList();

            order.DeliveryPrice = CalculateDeliveryPrice(ordersArticles);

            await _repository._orderRepository.Insert(order);
            await _repository.SaveChanges();

            return _mapper.Map<MyOrderDTO>(order);
        }

        public async Task<List<OrderDTO>> GetAll()
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var orders = ordersQuery.Include(o => o.Items).Include(o => o.Buyer).ToList();

            var returnValue = _mapper.Map<List<Order>, List<OrderDTO>>(orders);

            returnValue.ForEach(rv =>
            {
                rv.ItemPrice = CalculateItemPrice(orders.Where(o => o.Id == rv.Id).Single().Items);
            });
            return returnValue;
        }

        public async Task<List<OrderDTO>> GetAllDeliveredForSeller(int id)
        {
            var articleQuery = await _repository._articleRepository.GetAllAsync();
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var articles = articleQuery.Where(a => a.SellerId == id).ToList();
            var orders = ordersQuery.Include(o => o.Items)
                .Where(o => o.Items.Any(i => articles.Any(a => a.Id == i.ArticleId)) && o.DeliveryTime <= DateTime.Now && !o.IsCanceled).ToList();

            var returnValue = _mapper.Map<List<Order>, List<OrderDTO>>(orders);

            returnValue.ForEach(rv =>
            {
                rv.ItemPrice = CalculateItemPrice(orders.Where(o => o.Id == rv.Id).Single().Items);
            });
            return returnValue;
        }

        public async Task<List<OrderDTO>> GetAllInDeliveryForSeller(int id)
        {
            var articleQuery = await _repository._articleRepository.GetAllAsync();
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var articles = articleQuery.Where(a => a.SellerId == id).ToList();
            var orders = ordersQuery.Include(o => o.Items)
                .Where(o => o.Items.Any(i => articles.Any(a => a.Id == i.ArticleId)) && o.DeliveryTime > DateTime.Now && !o.IsCanceled).ToList();

            var returnValue = _mapper.Map<List<Order>, List<OrderDTO>>(orders);

            returnValue.ForEach(rv =>
            {
                rv.ItemPrice = CalculateItemPrice(orders.Where(o => o.Id == rv.Id).Single().Items);
            });
            return returnValue;
        }

        public async Task<List<MyOrderDTO>> GetAllMy(int id)
        {
            var ordersQuery = await _repository._orderRepository.GetAllAsync();
            var orders = ordersQuery.Include(o => o.Items).Where(o => o.BuyerId == id && !o.IsCanceled).ToList();

            var returnValue = _mapper.Map<List<Order>, List<MyOrderDTO>>(orders);

            returnValue.ForEach(rv =>
            {
                rv.ItemPrice = CalculateItemPrice(orders.Where(o => o.Id == rv.Id).Single().Items);
            });
            return returnValue;
        }

        private double CalculateDeliveryPrice(List<Article> articles)
        {
            return articles.Select(a => a.SellerId).Distinct().Count() * 100.00;
        }

        private double CalculateItemPrice(List<OrderItem> items)
        {
            var price = 0.0;
            items.ForEach(i => price += i.ArticlePrice);
            return price;
        }
    }
}
