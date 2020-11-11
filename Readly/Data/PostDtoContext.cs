using Microsoft.EntityFrameworkCore;
using Readly.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Data
{
    public class PostDtoContext : DbContext
    {
        public PostDtoContext(DbContextOptions<PostDtoContext> options)
    : base(options)
        {
        }

        public DbSet<PostDto> Post { get; set; }
    }
}
