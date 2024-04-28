using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microcreditos.Entities
{
    public class Prestamo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(11)]
        [Column(TypeName = "nvarchar(11)")]
        public string CI { get; set; }
        [Required]
        [MaxLength(150)]
        [Column(TypeName = "nvarchar(150)")]
        public required string Nombre { get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "nvarchar(11)")]
        public string ApellidoMaterno { get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string ApellidoPaterno { get; set; }
        [Required]
        [Column(TypeName = "decimal(6,2)")]
        public Decimal CantidadPrestada { get; set; }
        [MaxLength(32)]
        [Column(TypeName = "nvarchar(32)")]
        public string Telefono { get; set; }

        [Required]
        [MaxLength(200)]
        [Column(TypeName = "nvarchar(200)")]
        public string Email { get; set; }

        public DateTime FechaPrestamo { get; set; }

        public int DiaCobro { get; set; }

        public int MesesPrestamo { get; set; }

        public int Intereses { get; set; }

    }
}
