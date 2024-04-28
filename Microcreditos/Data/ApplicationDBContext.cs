using Microcreditos.Entities;
using Microsoft.EntityFrameworkCore;

namespace Microcreditos.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base (options) { }

        public DbSet<Prestamo> Prestamo { get; set; }
        public DbSet<Pago> Pago { get; set; }
    }
}
