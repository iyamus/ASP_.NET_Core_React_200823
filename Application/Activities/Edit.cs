using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var activty = await _context.Activities.FindAsync(request.Id);
                if (activty == null)
                {
                    throw new Exception("Could not find activity");
                }

                // request.Title이 null 이면 ?? activty.Title을 입력한다.
                activty.Title = request.Title ?? activty.Title;
                activty.Description = request.Description ?? activty.Description;
                activty.Category = request.Category ?? activty.Category;
                activty.Date = request.Date ?? activty.Date;
                activty.City = request.City ?? activty.City;
                activty.Venue = request.Venue ?? activty.Venue;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}