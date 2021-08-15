import React, { Component } from "react";

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/h5/gridstack-dd-native";

import styles from "./Gridstack.module.scss";

class Gridstack extends Component {
	componentDidMount() {
		GridStack.init({
			alwaysShowResizeHandle: true
		});
	}

	render() {
		return (
			<div>
				<div className={`grid-stack ${styles["grid-stack-custom"]}`}>
					{this.props.children.map((el, x) => (
						<div
							key={x}
							className="grid-stack-item"
							>
							<div className="grid-stack-item-content">
								{el}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Gridstack;
