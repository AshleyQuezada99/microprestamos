using Microcreditos.Data;
using Microcreditos.Entities;
using Microcreditos.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace Microcreditos.Repository
{
    public class PrestamoRepository : IPrestamoRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public PrestamoRepository(ApplicationDBContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<Prestamo> CreatePrestamo(Prestamo prestamo)
        {
            if (prestamo == null)
            {
                throw new ArgumentNullException(nameof(prestamo));
            }

            await _dbContext.Prestamo.AddAsync(prestamo);
            await _dbContext.SaveChangesAsync();
            return prestamo;
        }

        public async Task<bool> DeletePrestamo(int id)
        {
            var deleteId = await _dbContext.Prestamo.FindAsync(id);
            if(deleteId == null)
            {
                throw new ArgumentException("The Id provided is not valid or was not found");
            }

            _dbContext.Prestamo.Remove(deleteId);
            return true;
        }

        public async Task<Prestamo> GetPrestamoByCI(string CI)
        {
            var result = await _dbContext.Prestamo.FirstOrDefaultAsync(x => x.CI == CI);

            if(result == null)
            {
                throw new ArgumentException("The CI was not found");
            }

            return result;
        }

        public async Task<Prestamo> GetPrestamoById(int id)
        {
            var result = await _dbContext.Prestamo.FindAsync(id);

            if(result == null)
            {
                throw new Exception("The id was not found");
            }

            return result;
        }

        public async Task<IEnumerable<Prestamo>> GetPrestamos()
        {
            return await _dbContext.Prestamo.ToListAsync();
        }

        public async Task<bool> SaveChanges()
        {
            return (_dbContext.SaveChanges() >= 0);
        }

        public async Task<bool> UpdatePrestamo(Prestamo prestamo)
        {
            if (prestamo == null)
            {
                throw new ArgumentNullException(nameof(prestamo));
            }
            var updateId = _dbContext.Prestamo.Find(prestamo.Id);
            if (updateId == null)
            {
                throw new ArgumentNullException("The id did not match with any record to update");
            }

            _dbContext.Prestamo.Update(prestamo);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
