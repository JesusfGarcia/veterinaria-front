import React from "react";
import Content from "../../components/content";
import Perrito from "../../assets/images/coffee.jpg"
import MichiJpg from "../../assets/images/michi.jpeg";

import styles from "./userinfo.module.scss";
import { useParams } from "react-router-dom";

import {data} from "../user"
import Cartilla from "../../components/cartilla";

export default function UserInfo(){

    const {id} = useParams()


    const myUser = React.useMemo(() => {
            return data.find(item => item.id === id)
    },[])

    console.log(myUser)

    return(
    
           <Content title="Usuarios" button="añadir mascota">
         
          <div className={styles.container}>  
             <Cartilla/>
          </div>
           </Content>
           
  
    )
};

