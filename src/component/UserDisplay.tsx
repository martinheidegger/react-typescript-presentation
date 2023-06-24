// import { TypeOf } from 'zod'
import { User, Events } from '../model/checked'
import useSWR from 'swr'
// import { z } from 'zod'
import { useEffect } from 'react'
import { fetchJSON } from '../util/fetchJSON'

export interface UserDisplayProps {
  user: any // TypeOf<typeof User>
}

export const UserDisplay = ({ user }: UserDisplayProps) => {
  const data = useSWR(
    'https://owddm.com/public/events.json',
    async url => fetchJSON(url)
  )
  useEffect(() => {
    console.log(data.error)
  }, [data.error])
  if (data.isLoading) return <>Loading</>
  if (data.error) return <>Error while loading {String(data.error)}</>
  if (!data.data) return <>No Data from server</>
  const {
    data: { venues },
  } = data
  return (
    <dl>
      <dt>Name</dt>
      <dd>{user.name}</dd>
      <dt>Email</dt>
      <dd>{user.email}</dd>
      <dt>Groups</dt>
      <dd>
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>{venue.name}</li>
          ))}
        </ul>
      </dd>
    </dl>
  )
}
