using AutoMapper;
using Microcreditos.Dtos;
using Microcreditos.Entities;
using Microcreditos.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace Microcreditos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoController : ControllerBase
    {
        private readonly IPrestamoRepository _repository;
        private readonly IMapper _mapper;

        public PrestamoController(IPrestamoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrestamoDto>>> GetPrestamos()
        {
            var prestamos = await _repository.GetPrestamos();

            return Ok(_mapper.Map<IEnumerable<PrestamoDto>>(prestamos));

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PrestamoDto>> GetPrestamoById(int id)
        {
            var prestamo = await _repository.GetPrestamoById(id);

            return Ok(_mapper.Map<PrestamoDto>(prestamo));

        }

        [HttpGet("ByCI/{CI}")]
        public async Task<ActionResult<PrestamoDto>> GetPrestamoByCI(string CI)
        {
            var prestamo = await _repository.GetPrestamoByCI(CI);

            return Ok(_mapper.Map<PrestamoDto>(prestamo));

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePrestamo(int id)
        {
            await _repository.DeletePrestamo(id);
            await _repository.SaveChanges();

            return NoContent();

        }

        [HttpPost]
        public async Task<ActionResult<Prestamo>> CreatePrestamo(PrestamoDto prestamoDto)
        {
            var prestamoModel = _mapper.Map<Prestamo>(prestamoDto);
            await _repository.CreatePrestamo(prestamoModel);
            await _repository.SaveChanges();
            
            var createdPrestamo = _mapper.Map<PrestamoDto>(prestamoModel);

            return Ok(createdPrestamo);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePrestamo(int id, PrestamoDto prestamoDto)
        {
            var entity = await _repository.GetPrestamoById(id);
            if (entity == null)
            {
                return NotFound();
            }
  
            _mapper.Map(prestamoDto, entity);

            // Actualizar el préstamo en el repositorio
            await _repository.UpdatePrestamo(entity);
            await _repository.SaveChanges();

            return NoContent();

        }
    }
}
