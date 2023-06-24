import useSWR from 'swr'
import { fetchJSON } from '../util/fetchJSON'

export const Events = () => {
  const data = useSWR(
    'https://owddm.com/public/events.json',
    async url => await fetchJSON(url)
  )
  return <ul className="events">{
    data.data?.venues.map(venue => 
      <li key={venue.id}>{venue.name}</li>
    )
  }</ul>
}
