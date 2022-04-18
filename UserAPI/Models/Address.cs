using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserAPI.Models
{
    public class Address
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string AddressId { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public string StreetName { get; set; }
        public string ApartmentNumber { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Postalcode { get; set; }

    }
}
