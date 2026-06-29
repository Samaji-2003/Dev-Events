import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/constants'
function page() {
  return (
    <section>
      <h1 className="text-4xl font-bold text-center bg-gradient-to-b from-white via-white to-[#5dfeca] bg-clip-text text-transparent">The Hub For Every Dev<br/>Event You Need</h1>
      <p className="text-center text-lg text-gray-300 mt-4">
        Discover the latest developer events and meetups in your area.
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className='events'>
        {events.map((event) => (
          <li key={event.title}>
            <EventCard
              title={event.title}
              image={event.image}
              slug={event.slug}
              location={event.location}
              date={event.date}
              time={event.time}
            />
          </li>
          
        ))}
        </ul>
      </div>
    </section>
  )
}

export default page
