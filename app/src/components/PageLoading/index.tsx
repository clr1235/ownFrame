import React from 'react'
import {Spin} from 'antd'

import styles from './index.scss'

const PageLoading = (props) => {
  return (
    <div className={styles.pageLoding}>
      <Spin className={styles.spin} {...props}/>
    </div>
  )
}

export default PageLoading;