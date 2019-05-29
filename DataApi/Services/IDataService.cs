using System.Collections.Generic;
using System.Threading.Tasks;
using DataApi.Models;

namespace DataApi.Services
{
    public interface IDataService
    {
        NotesList LoadData();

        void AddNewRecord(Note note);

        void DeleteRecord(string id);
    }
}