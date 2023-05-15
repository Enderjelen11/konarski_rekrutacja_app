import React,{useState,useEffect} from 'react'
import Sidenav from './Sidenav'
import { FormsList } from './FormsList'
import { listen } from "@tauri-apps/api/event";
import { readTextFile } from "@tauri-apps/api/fs";
import { save, open } from "@tauri-apps/api/dialog";
import fileTemplate from "./template.json"
import { invoke } from '@tauri-apps/api';

export default function App(){
    const [menuPayload, setMenuPayload] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    
    const [classes,updateClasses]=useState<slide[][]>([[{title:"Profil",text:"",image:"",cIndx:0}]])
    const [cClassIndx,setClassIndex] = useState(0);

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

    const SaveFile = async () => {
        const slides = await readSlides();
        const classesCopy = [...classes];
        classesCopy[cClassIndx]=slides;
        updateClasses(classesCopy);
        const data:(number|null)[] = [...JSON.stringify(classesCopy.map(el=>el.map(e=>new Object({title:e.title,text:e.text,image:e.image}))))].map((e,i,arr)=>{
            if(e=='"'&&arr[i+1]==':'){
                return null;
            }else if(e=='"'&&(arr[i-1]==','||arr[i-1]=='{')){
                return null;
            }else{
                return e.charCodeAt(0);
            }
        }).filter(e=>e!=null);
        const contents = ([[...fileTemplate[0],...data,...fileTemplate[1]]]);
      try {
        let filepath = await save({filters:[{name: 'website',extensions: ['php']}]});
        await invoke("save_file", {path:filepath,contents})
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
            SaveFile();
            break;

          default:
            break;
        }
        setMenuOpen(false)
      }
    }, [menuOpen]);

    async function readSlides():Promise<slide[]>{
        console.log()
        return classes[cClassIndx].map((s,i)=>{
            return {
                title:document.getElementById(`form${i}title`)?.innerText||"",
                text:document.getElementById(`form${i}text`)?.innerText||"",
                image:document.getElementById(`form${i}image`)?.innerText||"",
                cIndx:i
            }
        });
    }

    async function addSlide(newEl:slide){
        const slides = await readSlides();
        const classesCopy = [...classes];
        classesCopy[cClassIndx]=[...slides,newEl];
        updateClasses(classesCopy);
    }

    async function addClass(){
        const slides = await readSlides();
        const classesCopy = [...classes];
        classesCopy[cClassIndx]=slides;
        console.log(slides);
        if(slides[0].title!=""){
            updateClasses([...classesCopy,[{title:"Profil",text:"",image:"",cIndx:classesCopy.length}]]);
        }
    }

    async function selectClass(index:number){
        let slides = await readSlides();
        const classesCopy = [...classes];
        classesCopy[cClassIndx]=slides;
        if(slides[0].title!=""){
            updateClasses(classesCopy);        
        }
        setClassIndex(index);
    }

    async function deleteSlide(index:number){
        const classesCopy = [...classes];
        classesCopy[cClassIndx] = classesCopy[cClassIndx].filter((e,i)=>i!=index);
        updateClasses(classesCopy);
    }
    
    async function deleteProfile(index:number){
        let classesCopy = [...classes];
        classesCopy = classesCopy.filter((e,i)=>i!=index);
        if(classesCopy.length!=0){
            updateClasses(classesCopy);
        }
    }


    return <>
        <Sidenav classes={classes} selectClass={selectClass} newClass={addClass} delete={deleteProfile}/>
        <FormsList slides={classes[cClassIndx]} classIndex={cClassIndx} addFunc={addSlide} delete={deleteSlide}/>
        <div>{classes[cClassIndx].length}</div>
        console.log()
    </>
}
