namespace NotificationsAPI.Models
{
    public class Address
    {
        public string AddressId { get; set; }
        public string UserId { get; set; }
        public string StreetName { get; set; }
        public string ApartmentNumber { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
    }
}
