using System;
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
    public class UsersController : Controller
    {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        // GET: UserDtos
        public async Task<IActionResult> Index()
        {
            return View(await _context.User.ToListAsync());
        }

        // GET: UserDtos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userDto = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userDto == null)
            {
                return NotFound();
            }

            return View(userDto);
        }

        // GET: UserDtos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: UserDtos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Handle")] User userDto)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userDto);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(userDto);
        }

        // GET: UserDtos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userDto = await _context.User.FindAsync(id);
            if (userDto == null)
            {
                return NotFound();
            }
            return View(userDto);
        }

        // POST: UserDtos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Handle")] User userDto)
        {
            if (id != userDto.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userDto);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserDtoExists(userDto.Id))
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
            return View(userDto);
        }

        // GET: UserDtos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userDto = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userDto == null)
            {
                return NotFound();
            }

            return View(userDto);
        }

        // POST: UserDtos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var userDto = await _context.User.FindAsync(id);
            _context.User.Remove(userDto);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserDtoExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
