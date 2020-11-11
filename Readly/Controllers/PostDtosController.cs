﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Readly.Data;
using Readly.Models;

namespace Readly.Controllers
{
    public class PostDtosController : Controller
    {
        private readonly PostDtoContext _context;

        public PostDtosController(PostDtoContext context)
        {
            _context = context;
        }

        // GET: PostDtos
        public async Task<IActionResult> Index()
        {
            return View(await _context.Post.ToListAsync());
        }

        // GET: PostDtos/Details/5
        public async Task<IActionResult> Details(int? id)
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

        // GET: PostDtos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PostDtos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Content,Date")] PostDto postDto)
        {
            if (ModelState.IsValid)
            {
                _context.Add(postDto);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(postDto);
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
        public async Task<IActionResult> Edit(int id, [Bind("Id,Content,Date")] PostDto postDto)
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