import { FaArrowRight } from 'react-icons/fa';

import styles from 'styles/component/NumberWidget.module.scss';

function NumberWidget({ ...props }) {
    return (
        <div className={styles.widget}>
            <div className={styles.title}>
                { props.title }
            </div>
            <div className={styles.data}>
                <div className={styles.label}>{ props.label }</div>
                <FaArrowRight className={styles.arrow} />
                <div className={styles.value} style={props.style}>{ props.value }</div>
            </div>
        </div>
    )
}

export default NumberWidget;