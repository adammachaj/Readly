using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Readly.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new PostDtoContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<PostDtoContext>>()))
            {
                // Look for any movies.
                if (context.Post.Any())
                {
                    return;   // DB has been seeded
                }

                context.Post.AddRange(
                    new PostDto
                    {
                        Text = "hejka",
                        PostDate = DateTime.Now,
                        Author = "AM"
                    },

                    new PostDto
                    {
                        Text = "hello",
                        PostDate = DateTime.Now,
                        Author = "xd"
                    },

                    new PostDto
                    {
                        Text = "czemuja",
                        PostDate = DateTime.Now,
                        Author = "lol"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
