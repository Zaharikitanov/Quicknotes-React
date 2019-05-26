using DataApi.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Web;

namespace DataApi.Services
{
    public class DataService : IDataService
    {
        public NotesList LoadData()
        {
            return ReadData();
        }

        public void AddNewRecord(Note note)
        {
            var noteText = note;
        }

        private NotesList ReadData()
        {
            var filePath = HttpContext.Current.Server.MapPath("/Data/quickNotes.json");

            using (StreamReader readFile = new StreamReader(filePath))
            {
                var json = readFile.ReadToEnd();
                var items = Newtonsoft.Json.JsonConvert.DeserializeObject<NotesList>(json);
                return items;
            }
        }
    }
}
