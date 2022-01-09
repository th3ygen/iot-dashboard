import * as React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import * as ReactIcons from "react-icons/fa";

import styles from "styles/component/Navbar.module.scss";

function CustomLink({ children, to, ...props }: LinkProps) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<div>
			<Link
				style={{ color: match ? "#444444" : "#000" }}
				to={to}
				{...props}
			>
				{children}
			</Link>
		</div>
	);
}

export default function Navbar({ ...props }) {
	const Icon = ({ name }) => {
		const TagName = ReactIcons[name];
		return !!TagName ? <TagName size={18} /> : <p>{name}</p>;
	};

	return (
		<div>
			<nav className={styles.nav}>
                <div className={styles['title-card']}>
                    <div className={styles.logo}>
                        {/* <Image src="/logo.png" width={100} height={100} alt=''/> */}
                    </div>
                    <div className={styles.text}>
                        <div className={`${styles.title} card-text`}>
                            Aidil
                        </div>
                        <div className={`${styles.label} card-text`}>
                            Developer
                        </div>
                    </div>
                </div>
				<div className={styles.links}>
					{props.paths.map((item, index) => (
						<CustomLink key={index} to={item.path} className={styles.link}>
							<Icon name={item.icon}/>
							{item.name}
						</CustomLink>
					))}
				</div>
			</nav>
		</div>
	);
}
