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
            try
            {
                if (pago == null)
                {
                    throw new ArgumentNullException(nameof(pago));
                }

                await _dbContext.Pago.AddAsync(pago);
                await _dbContext.SaveChangesAsync();
                return pago;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<bool> DeletePago(int id)
        {
            try
            {
                var deleteId = await _dbContext.Pago.FindAsync(id);
                if (deleteId == null)
                {
                    throw new ArgumentException("The Id provided is not valid or was not found");
                }

                _dbContext.Pago.Remove(deleteId);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<Pago> GetPagoById(int id)
        {
            try
            {
                var result = await _dbContext.Pago.FindAsync(id);

                if (result == null)
                {
                    throw new Exception("The id was not found");
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }

        public async Task<IEnumerable<Pago>> GetPagosByPrestamoId(int prestamoId)
        {
            try
            {
                var result = await _dbContext.Pago.Where(x => x.PrestamoId == prestamoId).ToListAsync();

                if (result.Count == 0)
                {
                    throw new ArgumentException("No se encontraron pagos con el PrestamoId especificado");
                }

                return result;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
          

        }

        public async Task<IEnumerable<Pago>> GetPagos()
        {
            return await _dbContext.Pago.ToListAsync();
        }

        public async Task<bool> SaveChanges()
        {
            try
            {
                return (_dbContext.SaveChanges() >= 0);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdatePago(Pago pago)
        {
            try
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
            catch (Exception ex)
            {
                throw new Exception("Error updating payment status: " + ex.Message);
            }
        }

        public async Task<bool> UpdatePagoByStatus(int id, bool status)
        {
            try
            {
                var pago = await _dbContext.Pago.FindAsync(id);
                if (pago == null)
                {
                    throw new ArgumentNullException(nameof(pago), "El pago no fue encontrado.");
                }

                pago.Status = status;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating payment status: " + ex.Message);
            }
        }

    }
}

