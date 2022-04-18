using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserAPI.Models
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }    
        public ulong ContactNumber { get; set; }
        public string EmailAddress {get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
