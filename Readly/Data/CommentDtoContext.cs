using Microsoft.EntityFrameworkCore;
using Readly.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Data
{
    public class CommentDtoContext : DbContext
    {
        public CommentDtoContext(DbContextOptions<CommentDtoContext> options)
    : base(options)
        {
        }

        public DbSet<CommentDto> Comment { get; set; }
    }
}
