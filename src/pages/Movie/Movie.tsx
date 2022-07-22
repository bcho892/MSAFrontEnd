import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'
import styles from './Movie.module.css'


function Movie() {
    let { id } = useParams()
    return (

        <div className={styles.container}>
            <NavBar />
            {id}
        </div>
    )
}

export default Movie