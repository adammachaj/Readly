using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Models
{
    public class Post
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string Author { get; set; }

        public int Likes { get; set; }

        [DataType(DataType.Date)]
        public DateTime PostDate { get; set; }
    }
}
