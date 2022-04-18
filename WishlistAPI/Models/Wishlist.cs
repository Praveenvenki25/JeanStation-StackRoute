using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WishlistAPI.Models
{
    public class Wishlist
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string WishlistId { get; set; }
        public string UserId { get; set; }
        public string ProductId { get; set; }

    }
}
