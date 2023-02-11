import React from "react";
import styles from "./search.module.scss"
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput (){
    return (
    <div className={styles.input_container}>
        <input placeholder="Buscar elemento" type="text" />
        <SearchIcon/>
    </div>
    )
}