import ParasitosEx from "./externos";
import ParasitosInt from "./internos";
import React from "react";
import Tabs from "../../../components/tabs";

export default function Parasitos (){
    return (<Tabs items={items}/>)
}
const items =[
  {  label: "Parasitos externos",
    component: <ParasitosEx/>
  } ,
  {
    label: "Parasitos Internos",
    component: <ParasitosInt/>
  }
]