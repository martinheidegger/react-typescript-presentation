import { forwardRef } from 'react'

export interface MainProps {
  value?: string
}
export const Main = forwardRef<HTMLDivElement>(
  ({ value }: MainProps, ref) => {
  return (
    <div className='main' ref={ref}>
      <div>Hello {value}</div>
    </div>
  )
})

export default Main
