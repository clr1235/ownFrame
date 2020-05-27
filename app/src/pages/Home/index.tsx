import React from 'react'
import { observer, inject } from 'mobx-react'

// typeScript 基础类型
/**
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
 * enum枚举类型
 * Void类型 只能为它赋值undefined和null
 * undefined和null两者各自有自己的类型分别叫做undefined和null，默认情况下他们是所有类型的子类型。   然而当指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
 * never类型表示的是那些永远不存在的值的类型。
 * never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
 * never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
 * object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
 * 
 * 
 * 类型断言
 */
let notSure: any = 4;
notSure = "maybe a string instead"
notSure = false;


const Home = (props) => {
  // console.log('首页===>>>', props)
  return (
    <div >
      <p>这是布尔值：{notSure}</p>
    </div>
  )
}

export default inject('store')(observer(Home))