using Microcreditos.Data;
using Microcreditos.Entities;
using Microcreditos.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace Microcreditos.Repository
{
    public class PagoRepository : IPagoRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public PagoRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Pago> CreatePago(Pago pago)
        {
            if (pago == null)
            {
                throw new ArgumentNullException(nameof(pago));
            }

            await _dbContext.Pago.AddAsync(pago);
            await _dbContext.SaveChangesAsync();
            return pago;
        }

        public async Task<bool> DeletePago(int id)
        {
            var deleteId = await _dbContext.Pago.FindAsync(id);
            if (deleteId == null)
            {
                throw new ArgumentException("The Id provided is not valid or was not found");
            }

            _dbContext.Pago.Remove(deleteId);
            return true;
        }

        public async Task<Pago> GetPagoById(int id)
        {
            var result = await _dbContext.Pago.FindAsync(id);

            if (result == null)
            {
                throw new Exception("The id was not found");
            }

            return result;
        }

        public async Task<IEnumerable<Pago>> GetPagosByPrestamoId(int prestamoId)
        {
            var result = await _dbContext.Pago.Where(x => x.PrestamoId == prestamoId).ToListAsync();

            if (result.Count == 0)
            {
                throw new ArgumentException("No se encontraron pagos con el PrestamoId especificado");
            }

            return result;
        }

        public async Task<IEnumerable<Pago>> GetPagos()
        {
            return await _dbContext.Pago.ToListAsync();
        }

        public async Task<bool> SaveChanges()
        {
            return (_dbContext.SaveChanges() >= 0);
        }

        public async Task<bool> UpdatePago(Pago pago)
        {
            if (pago == null)
            {
                throw new ArgumentNullException(nameof(pago));
            }
            var updateId = _dbContext.Pago.Find(pago.Id);
            if (updateId == null)
            {
                throw new ArgumentNullException("The id did not match with any record to update");
            }

            _dbContext.Pago.Update(pago);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}

