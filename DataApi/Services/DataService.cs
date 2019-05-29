using DataApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

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
            NotesList notesList = ReadData();
            var filePath = HttpContext.Current.Server.MapPath("/Data/quickNotes.json");
            note.Id = Guid.NewGuid().ToString();
            notesList.Notes.Add(note);
            File.WriteAllText(filePath, new JavaScriptSerializer().Serialize(notesList));
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
