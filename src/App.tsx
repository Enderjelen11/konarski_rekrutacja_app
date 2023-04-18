import React,{useState} from 'react'
import Sidenav from './Sidenav'
import { FormsList } from './FormsList'

export default function App(){
    const classes:{name:string,slides:slide[]}[] = [{name:'profil',slides:[{title:"sex",text:"sex",image:"sex"},{title:"dupa",text:"dupa",image:"dupa"}]}]
    const [cClassIndx,selectClass] = useState(0)

    return <>
        <Sidenav classes={classes}/>
        <FormsList slides={classes[cClassIndx].slides}/>
    </>
}
