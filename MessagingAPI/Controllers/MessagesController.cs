using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MessagingAPI.BusinessLogic;
using Microsoft.Extensions.Options;

namespace MessagingAPI.Controllers
{
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private IConfigurationRoot _config;
        public MessagesController()
        {
            _config = new ConfigurationBuilder().AddEnvironmentVariables().Build();
        }

        private MessagesFacade GetMessagesFacade()
        {
            return new MessagesFacade(_config);
        }

        // GET api/messages
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/messages/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/messages
        [HttpPost]
        public void Post([FromBody]string value)
        {
            GetMessagesFacade().SendMessage(value);
        }

        // PUT api/messages/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/messages/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
