using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Models
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Author { get; set; }

        [DataType(DataType.Date)]
        public DateTime PostDate { get; set; }
    }
}
