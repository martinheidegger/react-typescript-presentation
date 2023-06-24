import React from 'react'
import { useState, useEffect } from 'react'

export const Stateful = () => {
  let [state, setState] = useState()
  useEffect(() => {
    const int = setInterval(() => {
      state = state ? state + 1 : 1
      setState(state)
    }, 200)
    return () => clearInterval(int)
  }, [])

  return <div className='stateful'>Stateful: {state}</div>
}
