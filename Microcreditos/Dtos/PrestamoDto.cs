using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Microcreditos.Dtos
{
    public class PrestamoDto
    {
        //Se optó por agregar el Id al dto para poder hacer la relación de filtrado a los pagos más eficiente
        public int Id { get; set; }
        public string CI { get; set; }
        public string Nombre { get; set; }
        public string ApellidoMaterno { get; set; }
        public string ApellidoPaterno { get; set; }
        public Decimal CantidadPrestada { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public DateTime FechaPrestamo { get; set; }
        public int DiaCobro { get; set; }
        public int MesesPrestamo { get; set; }
        public int Intereses { get; set; }
    }
}
