import { useState } from 'react'


function invertColor(hex:string, bw:boolean) {
    function padZero(str:string, len?:number) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r:number|string = parseInt(hex.slice(0, 2), 16),
        g:number|string = parseInt(hex.slice(2, 4), 16),
        b:number|string = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function ElBox(props:{children:JSX.Element|string,color:string,onClick:()=>void}){
    const boxstyle={
        background:props.color,
        color:invertColor(props.color,true),
        borderRadius: '15px',
        padding: '10px',
        display:'inline-block'
    }
    return <button onClick={props.onClick} style={boxstyle}>{props.children}</button>
}

export default function ProfilesList(props:{profiles:{name:string,color:string}[], selectEl:()=>void, plusClicked:()=>void}) {
    return (
        <div>{[...props.profiles.map((profile,i)=>{
            return  <ElBox key={`b${i}`} onClick={props.selectEl} color={profile.color}>{profile.name}</ElBox>
        }),
            <ElBox key="add" onClick={props.plusClicked} color="#aa42f5">+</ElBox>
        ]}</div>
    )
}
