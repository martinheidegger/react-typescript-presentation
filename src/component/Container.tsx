import { Children } from 'react'
import type { OneOrMany } from '../types'

export interface ContainerProps {
  children: OneOrMany<string>
}
export const Container = ({ children }: ContainerProps) => {
  return <>{Children.map(children, (child) => child)}</>
}
