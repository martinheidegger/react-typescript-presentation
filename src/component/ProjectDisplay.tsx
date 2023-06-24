import { Project } from '../model/unchecked'

export interface ProjectDisplayProps {
  project: Project
}

export const ProjectDisplay = ({ project }: ProjectDisplayProps) => (
  <div className='project-display'>
    Project: {project.name} ({project.id})
  </div>
)
