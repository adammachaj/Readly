using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Readly.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Readly.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new PostContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<PostContext>>()))
            {
                // Look for any movies.
                if (context.Post.Any())
                {
                    return;   // DB has been seeded
                }

                context.Post.AddRange(
                    new Post
                    {
                        Content = Encoding.ASCII.GetBytes("hejka"),
                        PostDate = DateTime.Now,
                        Author = "AM"
                    },

                    new Post
                    {
                        Content = Encoding.ASCII.GetBytes("hello"),
                        PostDate = DateTime.Now,
                        Author = "xd"
                    },

                    new Post
                    {
                        Content = Encoding.ASCII.GetBytes("czemuja"),
                        PostDate = DateTime.Now,
                        Author = "lol"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
