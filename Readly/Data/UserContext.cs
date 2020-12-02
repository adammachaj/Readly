using Microsoft.EntityFrameworkCore;
using Readly.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
    : base(options)
        {
        }

        public DbSet<User> User { get; set; }
    }
}
