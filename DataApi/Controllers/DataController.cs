using DataApi.Models;
using DataApi.Services;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DataApi.Controllers
{
    public class DataController : ApiController
    {
        private IDataService _dataService;

        public DataController(IDataService dataService)
        {
            _dataService = dataService;
        }
        // GET: api/Data
        public NotesList Get()
        {
            return _dataService.LoadData();
        }

        // GET: api/Data/5
        public Note Get(string id)
        {
            return _dataService.LoadData().Notes.Where(x => x.Id == id).FirstOrDefault();
        }

        // POST: api/Data
        public void Post(Note note)
        {
            _dataService.AddNewRecord(note);
        }

        // PUT: api/Data/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Data/5
        public void Delete(int id)
        {
        }
    }
}
