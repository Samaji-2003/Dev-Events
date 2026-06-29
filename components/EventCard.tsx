import Link from "next/link";
import Image from "next/image";

function EventCard({title,image,slug,location,date,time} : {title:string,image:string,slug:string,location:string,date:string,time:string}) {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <div className="location flex items-center gap-2">
        <Image src="/icons/pin.svg" alt="Location Icon" width={14} height={14} />
        <p>{location}</p>
      </div>
      <div className="datetime">
        <div className="flex items-center gap-2">
          <Image src="/icons/calendar.svg" alt="Calendar Icon" width={14} height={14} />
          <p>{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/clock.svg" alt="Clock Icon" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
