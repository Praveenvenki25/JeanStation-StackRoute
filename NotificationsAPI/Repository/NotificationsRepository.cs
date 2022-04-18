using NotificationsAPI.App_GlobalResources;
using NotificationsAPI.Context;
using NotificationsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace NotificationsAPI.Repository
{
    public class NotificationsRepository : INotificationsRepository
    {
        //private readonly DataContext context;
        //public NotificationsRepository(DataContext context)
        //{
        //    this.context = context;
        //}
        
        public bool SendEmail(string emailId, string subject, string body)
        {

            bool isSend = false;

            var message = new MailMessage();

            if(emailId != null)
            {
                message.To.Add(new MailAddress(emailId));
                message.From = new MailAddress(EmailInfo.FROM_EMAIL_ACCOUNT);
                message.Subject = !string.IsNullOrEmpty(subject) ? subject : EmailInfo.EMAIL_SUBJECT_DEFAULT;
                message.Body = body;
                message.IsBodyHtml = true;

                using (var smtp = new SmtpClient())
                {
                    // Settings.  
                    var credential = new NetworkCredential
                    {
                        UserName = EmailInfo.FROM_EMAIL_ACCOUNT,
                        Password = EmailInfo.FROM_EMAIL_PASSWORD
                    };

                    // Settings.  
                    smtp.Credentials = credential;
                    smtp.Host = EmailInfo.SMTP_HOST_GMAIL;
                    smtp.Port = Convert.ToInt32(EmailInfo.SMTP_PORT_GMAIL);
                    smtp.EnableSsl = true;

                    // Sending  
                    smtp.SendMailAsync(message).Wait();

                    // Settings.  
                    isSend = true;
                }
            }
            // info.  
            return isSend;
        }
    }
}
