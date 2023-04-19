import React,{useState} from 'react'
import Sidenav from './Sidenav'
import { FormsList } from './FormsList'

export default function App(){
    const [classes,updateClasses]=useState<slide[][]>([[{title:"Profil",text:"",image:""}]])
    const [cClassIndx,selectClass] = useState(0)

    return <>
        <Sidenav classes={classes}/>
        <FormsList slides={classes[cClassIndx]} update={(slides:slide[])=>{updateClasses(classes.map((e,i)=>{console.log(classes);if(i==cClassIndx){return(slides)}else{return(e)}}))}}/>
    </>
}
