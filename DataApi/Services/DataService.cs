﻿using DataApi.Models;
using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace DataApi.Services
{
    public class DataService : IDataService
    {
        private string _filePath = HttpContext.Current.Server.MapPath("/Data/quickNotes.json");

        public NotesList LoadRecords()
        {
            return ReadData();
        }

        public void DeleteRecord(string id)
        {
            NotesList notesList = ReadData();
            var notes = notesList.Notes;

            notes.Remove(notes.Single(x => x.Id == id));
            SaveData(notesList);
        }

        public void AddNewRecord(Note note)
        {
            NotesList notesList = ReadData();
            
            note.Id = Guid.NewGuid().ToString();
            notesList.Notes.Add(note);
            SaveData(notesList);
        }

        private NotesList ReadData()
        {
            using (StreamReader readFile = new StreamReader(_filePath))
            {
                var json = readFile.ReadToEnd();
                var items = Newtonsoft.Json.JsonConvert.DeserializeObject<NotesList>(json);
                return items;
            }
        }

        private void SaveData(NotesList notesList)
        {
            File.WriteAllText(_filePath, new JavaScriptSerializer().Serialize(notesList));
        }
    }
}