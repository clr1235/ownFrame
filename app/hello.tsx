import * as React from 'react';

import { Button } from 'antd';

export interface HelloProps {
  compiler: string;
  framework: string;
}
export const Hello = (props: HelloProps) => {
  return (
    <h1>
      <Button type="default">按钮</Button>
      hello454545 from {props.compiler} and {props.framework}!
    </h1>
  )
}