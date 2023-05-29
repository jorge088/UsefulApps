import styles from './Topic.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Topic = ( {topic, topicValue , topicIcon } ) => {
  return (
    <>
        <div className={styles.topicContainer}>
            <div className={styles.topicIconContainer}>
                <FontAwesomeIcon className={styles.topicIcon} icon={topicIcon} ></FontAwesomeIcon>
                <p className={styles.topicIconDescription}>{ topic }</p>
            </div>
            <p className={styles.topicValue}>{ topicValue }</p>
        </div>
    </>
  )
}
export default Topic