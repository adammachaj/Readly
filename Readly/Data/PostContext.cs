using Microsoft.EntityFrameworkCore;
using Readly.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Data
{
    public class PostContext : DbContext
    {
        public PostContext(DbContextOptions<PostContext> options)
    : base(options)
        {
        }

        public DbSet<Post> Post { get; set; }
    }
}
