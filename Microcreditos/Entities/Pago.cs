using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Microcreditos.Entities
{
    public class Pago
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Monto { get; set; }
        [Required]
        public int PeriodoPago { get; set; }
        [Required]
        public DateTime FechaPago { get; set; }
        [Required]
        public bool EnTiempo { get; set; }
        [Required]
        public bool Status { get; set; }
        [Required]
        public int PrestamoId { get; set; }
        public Prestamo Prestamo { get; set; }

    }
}
