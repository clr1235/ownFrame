import React from 'react'
import { observer, inject } from 'mobx-react'

// typeScript 基础类型
/**
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
 * enum枚举类型
 */
let arr: any[] = [2, 'ww'];

const Home = (props) => {
  console.log('首页===>>>', props)
  return (
    <div >
      <p>这是布尔值：{arr}</p>
    </div>
  )
}

export default inject('store')(observer(Home))