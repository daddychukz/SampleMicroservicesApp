using Microsoft.Extensions.Configuration;
using Microsoft.Azure.ServiceBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;

namespace MessagingAPI.BusinessLogic
{
    public class MessagesFacade
    {
        private IConfigurationRoot _config;

        public MessagesFacade(IConfigurationRoot config)
        {
            _config = config;
        }

        public void SendMessage(string message)
        {
            string connectionString = _config["serviceBusConnectionString"];
            string entityPath = _config["serviceBusEntityPath"];
            TopicClient client = new TopicClient(connectionString, entityPath);
            var msg = new Message(Encoding.UTF8.GetBytes(String.Format("Message - [{0}] has been processed by messaging API on {1}", message, DateTime.Now.ToString())));
            client.SendAsync(msg).Wait();
            client.CloseAsync().Wait();
        }
    }
}
