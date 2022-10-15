using System;
using System.Collections.Generic;

#nullable disable

namespace TravelPlanner.Data
{
    public partial class Trip
    {
        public long Id { get; set; }
        public string Account { get; set; }
        public string TripCaption { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
