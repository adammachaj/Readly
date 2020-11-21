using Microsoft.EntityFrameworkCore;
using Readly.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Data
{
    public class UserDtoContext : DbContext
    {
        public UserDtoContext(DbContextOptions<UserDtoContext> options)
    : base(options)
        {
        }

        public DbSet<UserDto> User { get; set; }
    }
}
