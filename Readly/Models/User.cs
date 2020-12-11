﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Handle { get; set; }
        public List<Post> Posts { get; set; }
    }
}