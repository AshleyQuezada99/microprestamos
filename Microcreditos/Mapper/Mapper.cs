using AutoMapper;
using Microcreditos.Dtos;
using Microcreditos.Entities;

namespace Microcreditos.Mapper
{
    public class Mapper : Profile
    {
        public Mapper() 
        {
            CreateMap<Prestamo, PrestamoDto>().ReverseMap();
            CreateMap<Pago, PagoDto>().ReverseMap();
        }
    }
}
