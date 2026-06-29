'use client';
import Image from 'next/image';

function ExploreBtn() {
  return (
    <button type="button" id = "explore-btn" className="mt-7 mx-auto" onClick={() => {console.log("Explore button clicked")}}>
      <a href="/explore" className="text-blue-500 hover:text-blue-700">Explore Events</a>   
      <Image src="/icons/arrow-down.svg" alt="Arrow Down" width={20} height={20} className="inline ml-2" />
    </button>
    
  )
}

export default ExploreBtn
