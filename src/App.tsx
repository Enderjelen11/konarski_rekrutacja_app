import React,{useState,useRef} from 'react'
import Sidenav from './Sidenav'
import { FormsList } from './FormsList'

export default function App(){
    const [classes,updateClasses]=useState<slide[][]>([[{title:"Profil",text:"",image:"",cIndx:0}]])
    const [cClassIndx,selectClass] = useState(0);
    function saveFunc(addElement:slide[]){
        const arr = classes[cClassIndx].map((s,i)=>new Object({
            title:document.getElementById(`form${i}title${cClassIndx}`)?.innerText,
            text:document.getElementById(`form${i}text${cClassIndx}`)?.innerText,
            image:document.getElementById(`form${i}image${cClassIndx}`)?.innerText,
            cIndx:cClassIndx
        }))
        //@ts-ignore
        updateClasses(classes.map((e,i)=>{
            if(i==cClassIndx){
                return([...arr,...addElement])
            }else{return(e)}
        }));
    }

    return <>
        <Sidenav classes={classes} newClass={()=>{updateClasses([...classes,[{title:"Profil",text:"",image:"",cIndx:classes.length}]])}} selectClass={selectClass} saveFunc={saveFunc}/>
        <FormsList slides={classes[cClassIndx]} classIndex={cClassIndx} saveFunc={saveFunc}/>
    </>
}
