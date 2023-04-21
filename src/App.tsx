import React,{useState,useRef,useEffect} from 'react'
import Sidenav from './Sidenav'
import { FormsList } from './FormsList'
import { listen } from "@tauri-apps/api/event";
import { readTextFile, writeFile } from "@tauri-apps/api/fs";
import { save, open } from "@tauri-apps/api/dialog";

export default function App(){
    const [menuPayload, setMenuPayload] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    
    const [classes,updateClasses]=useState<slide[][]>([[{title:"Profil",text:"",image:"",cIndx:0}]])
    const [cClassIndx,selectClass] = useState(0);

    useEffect(() => {
      listen("menu-event", (e) => {
        console.log(e.payload);
        //@ts-ignore
        setMenuPayload(e.payload)
        setMenuOpen(true)
      })
    }, []);

    const OpenFile = async () => {
      try {
        let filepath = await open();
        //@ts-ignore
        let content = (await readTextFile(filepath));
        content = content.split('/*input*/')[1];
        content = content.split(`'`).map((e,i)=>{
                if(i%2==1){
                    return e.replace(/"/g, (`\\"`));
                }else{
                    return e;
                }
            }).join(`"`).split(':').map((e,j,f)=>{
                if(f[j+1]){
                    if(f[j+1][0]!='"'){
                        return e;    
                    }
                }
                const arr = e.split("");
                for(let i = arr.length-1; i>=0; i--){
                    if(arr[i]=='"'){
                        return e;
                    }else if(arr[i]==','||arr[i]=='{'){
                        arr.splice(i+1,0,'"');
                        return arr.join("")+'"';
                    }
                }    
                return e;
            }).join(':')
        updateClasses(JSON.parse(content));
      } catch (e) {
        console.log(e);
      }
    };

    const SaveFile = async (text:string) => {
      try {
        let filepath = await save();
        //@ts-ignore
        await writeFile({ contents: text, path: filepath, });
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      if (menuOpen) {
        switch (menuPayload) {
          case "open-event":
            OpenFile();
            break;
          case "save-event":
            SaveFile("sex");
            break;

          default:
            break;
        }
        setMenuOpen(false)
      }
    }, [menuOpen]);

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
