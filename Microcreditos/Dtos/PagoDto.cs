using Microcreditos.Entities;
using System.ComponentModel.DataAnnotations;

namespace Microcreditos.Dtos
{
    public class PagoDto
    {
        public int Id { get; set; }
        public int Monto { get; set; }
        public int PeriodoPago { get; set; }
        public DateTime FechaPago { get; set; }
        public bool EnTiempo { get; set; }
        public bool Status { get; set; }
        public int PrestamoId { get; set; }
    }
}
