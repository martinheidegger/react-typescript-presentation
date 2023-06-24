import { createRoot } from 'react-dom/client'
import Main from './component/Main'

const elem = document.getElementById('root')
const root = createRoot(elem)
root.render(<Main value='World' />)
