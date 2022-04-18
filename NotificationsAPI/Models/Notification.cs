using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationsAPI.Models
{
    public class Notification
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string NotificationID { get; set; }
        public string AddressId { get; set; }
        public string UserId { get; set; }
        public string OrderId { get; set; }
        public DateTime EmailSentDate { get; set; }    
    }
}
