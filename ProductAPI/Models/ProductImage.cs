using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ProductAPI.Models
{
    public class ProductImage
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ProductImageId { get; set; }
        public string ProductImageName { get; set; }
        public string ProductImageUrl { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        [ForeignKey("Product")]
        public string ProductId { get; set; }
    }
}
