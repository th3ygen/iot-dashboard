import React, { Component } from 'react';

import styles from './Box.module.scss';

class Box extends Component {
    render() {
        return (
            <div className={`${styles.box} ${this.props.className}`}>
                {this.props.children} 
            </div>
        );
    }
}

export default Box;