using Microcreditos.Entities;

namespace Microcreditos.Repository.IRepository
{
    public interface IPagoRepository
    {
        Task<IEnumerable<Pago>> GetPagos();
        Task<Pago> GetPagoById(int id);
        Task<IEnumerable<Pago>> GetPagosByPrestamoId(int prestamoId);
        Task<Pago> CreatePago(Pago pago);
        Task<bool> UpdatePago(Pago pago);
        Task<bool> UpdatePagoByStatus(int id, bool status);
        Task<bool> DeletePago(int id);
        Task<bool> SaveChanges();
    }
}
