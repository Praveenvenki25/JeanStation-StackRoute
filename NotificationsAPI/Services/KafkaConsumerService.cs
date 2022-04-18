using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using NotificationsAPI.Models;
using NotificationsAPI.Repository;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace NotificationsAPI.Services
{
    public class KafkaConsumerService: IHostedService
    {
        private readonly IConfiguration configuration;
        private readonly INotificationsRepository notificationsRepository;


        public KafkaConsumerService(IConfiguration configuration, INotificationsRepository repo)
        {
            this.configuration = configuration;
            this.notificationsRepository = repo;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            ConsumerConfig config = new ConsumerConfig 
            {  
                BootstrapServers = configuration["Kafka:Server"],
                GroupId = "test_group"
            };

            using (var consumer = new ConsumerBuilder<Null, string>(config).Build())
            {
                consumer.Subscribe(configuration["Kafka:Topic"]);
                var cancelToken = new CancellationTokenSource();
                try
                {
                    while(true)
                    {
                        var topicConsumer = consumer.Consume(cancelToken.Token);
                        if(topicConsumer.Message.Value.Contains("OrderId"))
                        {
                            var orderData = JsonConvert.DeserializeObject<Order>(topicConsumer.Message.Value);
                            SendOrderConfirmationEmail(orderData);
                        }
                        else if (topicConsumer.Message.Value.Contains("UserId"))
                        {
                            var userData = JsonConvert.DeserializeObject<User>(topicConsumer.Message.Value);
                            SendRegisterConfirmationEmail(userData);
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    consumer.Close();
                }
            };
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public bool SendOrderConfirmationEmail(Order order)
        {
            string emailId = order.User.EmailAddress;
            string subject = $"Thank You For Your Jean Station Online Order: #{order.OrderId}";
            string body = $"Hello {order.User.FirstName} {order.User.LastName},<br/><br/>Thank you for shopping at Jean Station. We are delighted that you found something you like! We will contact you when your package is shipped.<br/><br/>Thanks.<br>Team Jean Station";
            return notificationsRepository.SendEmail(emailId, subject, body);
        }

        public bool SendRegisterConfirmationEmail(User user)
        {
            string emailId = user.EmailAddress;
            string subject = $"Jean Station Registration Success";
            string body = $"Hello {user.FirstName} {user.LastName},<br/><br/>Thank you for registering with Jean Station.<br/><br/>Thanks.<br>Team Jean Station";
            bool result = notificationsRepository.SendEmail(emailId, subject, body);

            return result;
        }

        public bool SendPasswordChangeEmail(User user)
        {
            string emailId = user.EmailAddress;
            string subject = $"Password Change on your account:";
            string body = $"Hello {user.FirstName} {user.LastName},<br/>This email is to let you know that your account password has been changed.<br/>Thanks.";
            bool result = notificationsRepository.SendEmail(emailId, subject, body);

            return result;
        }
    }
}
