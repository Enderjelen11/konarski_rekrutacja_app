import React,{useState,useEffect} from 'react'
import Sidenav from './Sidenav'
import { FormsList } from './FormsList'
import fileTemplate from "./template.json"

export default function App(){
    const [menuPayload, setMenuPayload] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    
    const [classes,updateClasses]=useState<slide[][]>([[{title:"Profil",text:"",image:"",cIndx:0}]])
    const [cClassIndx,setClassIndex] = useState(0);

    const OpenFile = async () => {
        //this should be automatic
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
      } catch (e) {
          //save file here
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
