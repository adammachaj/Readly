using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Models
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public UserDto Author { get; set; }
    }
}
