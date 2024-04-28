using Microcreditos.Entities;

namespace Microcreditos.Repository.IRepository
{
    public interface IPrestamoRepository
    {
        Task<IEnumerable<Prestamo>> GetPrestamos();
        Task<Prestamo> GetPrestamoById(int id);
        Task<Prestamo> GetPrestamoByCI(string username);
        Task<Prestamo> CreatePrestamo(Prestamo prestamo);
        Task<bool> UpdatePrestamo(Prestamo prestamo);
        Task<bool> DeletePrestamo(int id);
        Task<bool> SaveChanges();
    }
}
