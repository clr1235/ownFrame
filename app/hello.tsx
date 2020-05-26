import * as React from 'react';

import { Button } from 'antd';

import styles from './app.scss';
import reactPng from './src/assets/images/react.png';
import indexJpg from './src/assets/images/index.jpg';

export interface HelloProps {
  compiler: string;
  framework: string;
}
export const Hello = (props: HelloProps) => {
  return (
    <div className={styles.app_page}>
      <Button type="default">按钮</Button>
      hello454545 from {props.compiler} and {props.framework}!
      <img src={reactPng} alt=""/>
      <img src={indexJpg} alt=""/>
    </div>
  )
}