using DotnetAPI.Data;
using DotnetAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt => 
    opt.UseSqlite(builder.Configuration.GetConnectionString("SqlLiteDB")));

var app = builder.Build();

//app.UseHttpsRedirection();

app.MapGet("api/todos", async (AppDbContext context) => {
    var items = await context.ToDos.ToListAsync();

    return Results.Ok(items);
});

app.MapPost("api/todos", async (AppDbContext context, ToDo toDo) => {
    
    await context.ToDos.AddAsync(toDo);

    await context.SaveChangesAsync();

    return Results.Created($"api/todos/{toDo.Id}", toDo);
});

app.Run();

