import React, { useEffect, useState } from 'react';

import { closeOutline } from 'ionicons/icons';

import { Image } from '../../shared/models';
import configuration from '../../shared/configuration';
import { IonIcon, IonImg, IonModal } from '@ionic/react';
import './MovieGallery.css';

interface myProps {
    images: Image[];
}

function MovieGallery(props: myProps) {
    const [showModal, setShowModal] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [imageClass, setImageClass] = useState('');

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener('resize', resizeWindow);
        return () => window.removeEventListener('resize', resizeWindow);
    }, []);

    const backdropSizes = configuration.images.backdrop_sizes;
    const baseURL = configuration.images.secure_base_url;

    const setImagePathAndOpenModal = (
        filepath: string,
        imageRatio: number,
    ) => {
        setImagePath(filepath);

        // Must check screen ratio and image ratio to add classes accordingly:
        // imageRatio is 1.77 for gallery images and 0.66 for posters
        if (imageRatio >= windowWidth / windowHeight) {
        setImageClass('fit-width');
        } else {
        setImageClass('fit-height');
        }

        setShowModal(true);
    };

    let { images } = props;

    let movieGallery;
    if (images) {
        movieGallery = images.map((image: Image, index: number) => {
            return (
                <picture key={index} className="picture landscape-ratio">
                <IonImg
                    className="ion-no-padding picture-content"
                    src={`${baseURL}${backdropSizes[1]}${image.file_path}`}
                    alt="movie pic"
                    onClick={() =>
                    setImagePathAndOpenModal(
                        `${baseURL}${backdropSizes[2]}${image.file_path}`,
                        1.77,
                    )
                    }
                ></IonImg>
                </picture>
            );
        });
    }

    return (
        <div className="gallery">
            {movieGallery}
            <IonModal
                isOpen={showModal}
                cssClass="modal"
                onDidDismiss={() => setShowModal(false)}
            >
            <div className="img-container">
                <img
                src={imagePath}
                alt="movie poster"
                className={imageClass}
                />
            </div>
            <div className="close-btn">
                <IonIcon
                icon={closeOutline}
                onClick={() => setShowModal(false)}
                ></IonIcon>
            </div>
            </IonModal>
        </div>
    )
}

export default MovieGallery;
