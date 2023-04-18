import React from 'react'
import ReactDOM from 'react-dom/client'
import Sidenav from './Sidenav'
import { FormsList } from './FormsList'

const classes:{name:string}[] = []
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Sidenav classes={classes}/>
    <FormsList/>
  </React.StrictMode>,
)
