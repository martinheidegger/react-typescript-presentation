import { Events } from './Events'
import { ProjectDisplay } from './ProjectDisplay'

export const Main = ({ value }) => {
  return (
    <div class='main'>
      <div>Hello {value}</div>
      <ProjectDisplay project={{ data: {}, id: '1', name: 'My Project' }} />
      <Events />
    </div>
  )
}

export default Main
