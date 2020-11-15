import { IonButton } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './Home.css';

function Home() {
    const history = useHistory();

    const navToMovies = () => {
        history.push('/main/movies');
    };

    return (
        <div className="home">
            <figure>
                <p>Welcome to</p>
                <img src="assets/images/logo_home.png"  height="200" alt=""/>
            </figure>
            <IonButton
                color="primary"
                onClick={navToMovies}
            >
                ENTER
            </IonButton>
            <div className="credits">
                <p className="personal">Developed by <a href="https://www.luizdaniellima.com.br/" target="_blank" rel="noopener noreferrer">Luiz Daniel Lima</a></p>
                <p>Data from <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database</a></p>
            </div>
            
        </div>
    )
}

export default Home;
