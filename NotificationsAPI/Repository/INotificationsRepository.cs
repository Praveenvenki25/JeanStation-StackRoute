using NotificationsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NotificationsAPI.Repository
{
    public interface INotificationsRepository
    {
        public bool SendEmail(string emailId, string subject, string body);
    }
}
