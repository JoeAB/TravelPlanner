using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelPlanner.Data;

namespace TravelPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private TravelPlannerContext _db;
        public TripController(TravelPlannerContext db)
        {
            _db = db;
        }

        public ActionResult Trips(String account)
        {
            
            return Ok();
        }
    }
}
