using Microsoft.AspNetCore.Mvc;
using TrenBackend.Models;

namespace TrenBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrenController : ControllerBase
    {
        private static Tren _tren = new Tren();

        [HttpPost("enganchar")]
        public IActionResult EngancharVagon([FromBody] Dictionary<string, object> request)
        {
            int numero = Convert.ToInt32(request["numero"]);
            string posicion = request["posicion"].ToString();

            if (posicion == "izquierda")
                _tren.Vagones.Insert(0, numero);
            else
                _tren.Vagones.Add(numero);

            return Ok(new { tren = _tren.Vagones });
        }

        [HttpPost("desenganchar")]
        public IActionResult DesengancharVagon([FromBody] Dictionary<string, string> request)
        {
            if (_tren.Vagones.Count == 0)
                return BadRequest("El tren está vacío");

            string posicion = request["posicion"];
            
            if (posicion == "izquierda")
                _tren.Vagones.RemoveAt(0);
            else
                _tren.Vagones.RemoveAt(_tren.Vagones.Count - 1);

            return Ok(new { tren = _tren.Vagones });
        }

        [HttpGet]
        public IActionResult ObtenerTren()
        {
            return Ok(new { tren = _tren.Vagones });
        }
    }
}
