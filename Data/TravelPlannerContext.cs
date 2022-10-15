using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace TravelPlanner.Data
{
    public partial class TravelPlannerContext : DbContext
    {
        private String _connectionString;
        public TravelPlannerContext(String connectionString)
        {
            _connectionString = connectionString;
        }

        public TravelPlannerContext(DbContextOptions<TravelPlannerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Trip> Trips { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite(_connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Trip>(entity =>
            {
                entity.ToTable("Trip");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.EndDate)
                    .IsRequired()
                    .HasColumnName("End_Date");

                entity.Property(e => e.StartDate)
                    .IsRequired()
                    .HasColumnName("Start_Date");

                entity.Property(e => e.TripCaption)
                    .IsRequired()
                    .HasColumnName("Trip_Caption");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
