
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// This is an example of how an ASP.NET Core backend would be structured
// to support the React frontend you have. This file would be part of an
// ASP.NET Core Web API project, not your React app.

namespace ClubApp.Models
{
    // Club model matching your React app's data structure
    public class Club
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public string Location { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string[] Tags { get; set; }
        public DateTime Date { get; set; }
        public int Capacity { get; set; }
        public bool IsFeatured { get; set; }
    }
}

namespace ClubApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubsController : ControllerBase
    {
        private static readonly List<Club> _clubs = new List<Club>
        {
            new Club
            {
                Id = "1",
                Name = "Neon Dance Party",
                Description = "Experience the ultimate neon dance party with immersive lights and top DJs",
                Image = "/images/club1.jpg",
                Category = "Nightclub",
                Location = "Downtown",
                Latitude = 40.712776,
                Longitude = -74.005974,
                Tags = new[] { "Dance", "Electronic", "Neon" },
                Date = DateTime.Now.AddDays(3),
                Capacity = 250,
                IsFeatured = true
            },
            new Club
            {
                Id = "2",
                Name = "Jazz on the Roof",
                Description = "Sophisticated jazz night on our scenic rooftop lounge",
                Image = "/images/club2.jpg",
                Category = "Jazz",
                Location = "Uptown",
                Latitude = 40.713776,
                Longitude = -74.015974,
                Tags = new[] { "Jazz", "Live Music", "Rooftop" },
                Date = DateTime.Now.AddDays(5),
                Capacity = 100,
                IsFeatured = false
            },
            // More clubs would be added here, typically from a database
        };

        // GET: api/clubs
        [HttpGet]
        public ActionResult<IEnumerable<Club>> GetAll()
        {
            return _clubs;
        }

        // GET: api/clubs/5
        [HttpGet("{id}")]
        public ActionResult<Club> GetById(string id)
        {
            var club = _clubs.FirstOrDefault(c => c.Id == id);
            
            if (club == null)
            {
                return NotFound();
            }
            
            return club;
        }

        // GET: api/clubs/featured
        [HttpGet("featured")]
        public ActionResult<IEnumerable<Club>> GetFeatured()
        {
            var featuredClubs = _clubs.Where(c => c.IsFeatured).ToList();
            return featuredClubs;
        }

        // GET: api/clubs/category/{categoryName}
        [HttpGet("category/{categoryName}")]
        public ActionResult<IEnumerable<Club>> GetByCategory(string categoryName)
        {
            var categoryClubs = _clubs.Where(c => c.Category.Equals(categoryName, StringComparison.OrdinalIgnoreCase)).ToList();
            return categoryClubs;
        }
        
        // POST: api/clubs
        [HttpPost]
        public ActionResult<Club> Create(Club club)
        {
            club.Id = (_clubs.Count + 1).ToString();
            _clubs.Add(club);
            
            return CreatedAtAction(nameof(GetById), new { id = club.Id }, club);
        }

        // PUT: api/clubs/5
        [HttpPut("{id}")]
        public IActionResult Update(string id, Club club)
        {
            var existingClub = _clubs.FirstOrDefault(c => c.Id == id);
            
            if (existingClub == null)
            {
                return NotFound();
            }
            
            // In a real application, you would update the database
            // Here we're just updating our in-memory list
            var index = _clubs.IndexOf(existingClub);
            club.Id = id; // Ensure ID stays the same
            _clubs[index] = club;
            
            return NoContent();
        }

        // DELETE: api/clubs/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var club = _clubs.FirstOrDefault(c => c.Id == id);
            
            if (club == null)
            {
                return NotFound();
            }
            
            _clubs.Remove(club);
            
            return NoContent();
        }
    }
}
