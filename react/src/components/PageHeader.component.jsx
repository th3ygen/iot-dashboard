import { useNavigate } from "react-router-dom";
import * as ReactIcons from "react-icons/fa";

import styles from "styles/component/PageHeader.module.scss";

function PageHeader(props) {
    const navigate = useNavigate();

	const Icon = ({ name }) => {
		const TagName = ReactIcons[name];
		return !!TagName ? <TagName /> : <p>{name}</p>;
	};

    const redirect = (path, state) => {
        navigate(path, { replace: true, state});
    };

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<div className={styles.title}>{props.title || "Unknown"}</div>
				<div className={styles.brief}>{props.brief || "Unknown"}</div>
			</div>
			<div className={styles.navs}>
				{props.navs &&
					props.navs.map((nav, i) => (
						<div key={i} className={styles.nav} onClick={ () => redirect(nav.path, nav.state || {}) }>
							<Icon name={nav.icon} />
							<span>{nav.name}</span>
						</div>
					))}
			</div>
		</div>
	);
}

export default PageHeader;
