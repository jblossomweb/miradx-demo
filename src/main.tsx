import React from 'react'
import { createRoot } from 'react-dom/client'

import 'app/global.css'
import App from 'app'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)