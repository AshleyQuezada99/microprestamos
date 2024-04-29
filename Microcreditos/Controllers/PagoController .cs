using AutoMapper;
using Microcreditos.Dtos;
using Microcreditos.Entities;
using Microcreditos.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace Microcreditos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagoController : ControllerBase
    {
        private readonly IPagoRepository _repository;
        private readonly IMapper _mapper;

        public PagoController(IPagoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PagoDto>>> GetPagos()
        {
            var prestamos = await _repository.GetPagos();

            return Ok(_mapper.Map<IEnumerable<PagoDto>>(prestamos));

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PagoDto>> GetPagoById(int id)
        {
            var pago = await _repository.GetPagoById(id);

            return Ok(_mapper.Map<PagoDto>(pago));

        }

        [HttpGet("ByPrestamo/{prestamoId}")]
        public async Task<ActionResult<IEnumerable<PagoDto>>> GetPagosByPrestamoId(int prestamoId)
        {
            var pagos = await _repository.GetPagosByPrestamoId(prestamoId);

            return Ok(_mapper.Map<IEnumerable<PagoDto>>(pagos));

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePago(int id)
        {
            await _repository.DeletePago(id);
            await _repository.SaveChanges();

            return NoContent();

        }

        [HttpPost]
        public async Task<ActionResult<Pago>> CreatePago(PagoDto prestamoDto)
        {
            var prestamoModel = _mapper.Map<Pago>(prestamoDto);
            await _repository.CreatePago(prestamoModel);
            await _repository.SaveChanges();
            
            var createdPago = _mapper.Map<PagoDto>(prestamoModel);

            return Ok(createdPago);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePago(int id, PagoDto prestamoDto)
        {
            var entity = await _repository.GetPagoById(id);
            if (entity == null)
            {
                return NotFound();
            }
  
            _mapper.Map(prestamoDto, entity);

            // Actualizar el préstamo en el repositorio
            await _repository.UpdatePago(entity);
            await _repository.SaveChanges();

            return NoContent();

        }
    }
}
