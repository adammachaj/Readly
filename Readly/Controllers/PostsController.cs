﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Readly.Data;
using Readly.Models;

namespace Readly.Controllers
{
    public class PostsController : Controller
    {
        private readonly PostContext _context;

        public PostsController(PostContext context)
        {
            _context = context;
        }

        //[HttpPost]
        //public ActionResult UploadPost(JsonResult content)
        //{
        //    _context.Add
        //}

        // POST: PostDtos/Create
        //public async Task<IActionResult> Create([Bind("Id,Text,Author")] PostDto postDto)
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Route("createpost")]
        public async Task<IActionResult> CreatePost([FromBody] Article article)
        {
            Console.WriteLine("CONTENT: " + JsonSerializer.Serialize(article));

            var post = new Post
            {
                Content = (JsonSerializer.Serialize(article.content)),
                Headline = (article.headline),
                PostDate = DateTime.Now
            };

            _context.Add(post);
            await _context.SaveChangesAsync();

            return Json(article);
        }

        // GET: GetPosts
        [Route("posts")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult GetPosts()
        {
            return Json(_context.Post.ToList());
        }

        // GET: PostDtos
        public async Task<IActionResult> Index()
        {
            return View(await _context.Post.ToListAsync());
        }

        // GET: PostDtos/Details/5
        [Route("post/details/{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var post = await _context.Post
                .FirstOrDefaultAsync(m => m.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            return Json(post);
        }

        [Route("post/content/{id}")]
        public async Task<IActionResult> Content(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var post = await _context.Post
                .FirstOrDefaultAsync(m => m.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            return Json(post.Content);
        }

        [Route("post/search/{criterion}")]
        public async Task<IActionResult> SearchPost(string? criterion)
        {
            if (criterion == null)
            {
                return NotFound();
            }

            var posts = _context.Post.ToList();

            if (posts == null)
            {
                return NotFound();
            }

            var found = from post in posts
                        where ( post.Content != null && post.Content.Contains(criterion) ) || ( post.Author != null && post.Author.Equals(criterion) )
                        select post;

            return Json(found);
        }

        // GET: PostDtos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var postDto = await _context.Post.FindAsync(id);
            if (postDto == null)
            {
                return NotFound();
            }
            return View(postDto);
        }

        // POST: PostDtos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Text,Author,PostDate")] Post postDto)
        {
            if (id != postDto.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(postDto);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PostDtoExists(postDto.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(postDto);
        }

        // GET: PostDtos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var postDto = await _context.Post
                .FirstOrDefaultAsync(m => m.Id == id);
            if (postDto == null)
            {
                return NotFound();
            }

            return View(postDto);
        }

        // POST: PostDtos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var postDto = await _context.Post.FindAsync(id);
            _context.Post.Remove(postDto);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PostDtoExists(int id)
        {
            return _context.Post.Any(e => e.Id == id);
        }
    }
}
