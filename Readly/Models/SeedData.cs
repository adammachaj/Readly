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
                        Content = "hejka",
                        PostDate = DateTime.Now
                    },

                    new PostDto
                    {
                        Content = "hello",
                        PostDate = DateTime.Now
                    },

                    new PostDto
                    {
                        Content = "czemuja",
                        PostDate = DateTime.Now
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
