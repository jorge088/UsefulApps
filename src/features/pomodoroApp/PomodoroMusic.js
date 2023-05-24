import styles from './PomodoroMusic.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faMusic, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import MUSIC_VIDEOS_DATA from './../../Consts/musicVideoData.js';

const PomodoroMusic = () => {

    const [showMusicSelector, setShowMusicSelector] = useState(false);
    const [videoContainer, setVideoContainer] = useState({
        show: false,
        category: '',
        videos: ''
    })
    const [videoSelected, setVideoSelected] = useState({
        selected: false,
        video: ''
    });

    const handleShowMusicSelectorClick = () => {
        setShowMusicSelector(true)
    }

    const handleShowVideosCategory = (e) => {
        let category = e.target.textContent;
        let videosFiltered = filterVideosCategory(category)
        setVideoContainer({ show: true, category, videos: videosFiltered })
    }

    const filterVideosCategory = (category) => {
        setVideoSelected({
            selected: false,
            video: ''
        });
        let videosFiltered = MUSIC_VIDEOS_DATA.filter(video => video.category === category);
        let videos = videosFiltered.map((value, key) =>
            <div
                key={key}
                onClick={() => { handleVideoSelected(value) }}
                className={styles.imgVideoContainer}
            >
                <img
                    src={`https://img.youtube.com/vi/${value.id}/hqdefault.jpg`}
                    alt={`${value.title}`}
                    className={styles.videosImg}
                />
                <p className={styles.videoTitle}>{value.title}</p>
                <FontAwesomeIcon className={styles.playIcon} icon={faPlayCircle} />
            </div>

        )
        return videos;
    }

    const handleVideoSelected = (value) => {
        let iframe = <iframe
            title="Youtube"
            aria-hidden="true"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading='lazy'
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            className={styles.videosIframe}
            src={`https://www.youtube.com/embed/${value.id}?autoplay=1`}>
        </iframe>
        setVideoSelected({
            selected: true,
            video: iframe
        });
    }

    const handleCloseMusic = () => {
        setShowMusicSelector(false)
    }

    return (
        <div className={styles.pomodoroMusicContainer}>
            <div className={`${styles.musicShow} ${showMusicSelector && styles.line}`} >
                <button className={styles.btnShowMusic} onClick={handleShowMusicSelectorClick}>Elegí tu musica para concentrarte
                    <FontAwesomeIcon className={styles.musicIcon} icon={faMusic} />
                </button>
                {showMusicSelector &&
                    <button className={styles.btnCloseMusic}>
                        <FontAwesomeIcon className={styles.closeIcon} onClick={handleCloseMusic} icon={faSquareXmark} />
                    </button>
                }
            </div>

            {showMusicSelector &&
                <div className={styles.musicContainer}>
                    <div className={styles.musicCategoryContainer}>
                        <ul>
                            <li
                                className={videoContainer.category === 'LO FI' && styles.selected}
                                onClick={handleShowVideosCategory}>LO FI
                            </li>
                            <li
                                className={videoContainer.category === 'NATURALEZA' && styles.selected}
                                onClick={handleShowVideosCategory}>NATURALEZA
                            </li>
                            <li
                                className={videoContainer.category === 'CLASICA' && styles.selected}
                                onClick={handleShowVideosCategory}>CLASICA
                            </li>
                            <li
                                className={videoContainer.category === 'JAZZ' && styles.selected}
                                onClick={handleShowVideosCategory}>JAZZ
                            </li>
                        </ul>
                    </div>

                    {videoContainer.show &&
                        <div className={styles.videosContainer}>
                            {!videoSelected.selected && videoContainer.videos}
                            {videoSelected.selected && videoSelected.video}
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default PomodoroMusic