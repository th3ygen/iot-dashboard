import styles from "styles/component/Wrapper.module.scss";

function Wrapper(props) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.label}>
                        {props.title}
                    </div>
                    <div className={styles.shape}></div>
                </div>
            </div>
            <div className={styles.body}>
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;