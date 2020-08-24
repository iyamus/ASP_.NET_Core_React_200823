using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        // Ctl+ . 을 누르면 hotfix 호출
        // NuGet Package 실행 --> Microsoft.EntityFrameworkCore --> Core/ SQLite 추가 with Framework 버전에 맞게!

        // ctor 타입하고 tab을 누르면 생성자 생성
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        // prop 타입하고 tab을 눌러서 생성
        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>().HasData(
                new Value{Id = 1, Name="Value101"},
                new Value{Id = 2, Name="Value102"},
                new Value{Id = 3, Name="Value103"},
                new Value{Id = 4, Name="Value104"}
            );
        }


    }
}
