import * as React from 'react';

import { Button } from 'antd';

import styles from './app.scss';

export interface HelloProps {
  compiler: string;
  framework: string;
}
export const Hello = (props: HelloProps) => {
  return (
    <div className={styles.app_page}>
      <Button type="default">按钮</Button>
      hello454545 from {props.compiler} and {props.framework}!
    </div>
  )
}