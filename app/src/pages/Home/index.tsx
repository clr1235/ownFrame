import React from 'react'
import { observer, inject } from 'mobx-react'

// typeScript 基础类型
/**
 * 1. void 
 * 2. 数组 
 * 3. 元组Tuple 类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
 * 4. object 表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
 * 5. enum 枚举类型
 * 6. any类型
 * 7. never类型 表示的是那些永远不存在的值的类型。
 * 8. null 
 * 9. undefined
 * 10. boolean 
 * 11. string
 * 12. number 
 * 
 * Void类型 只能为它赋值undefined和null
 * undefined和null两者各自有自己的类型分别叫做undefined和null，默认情况下他们是所有类型的子类型。   然而当指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
 * never类型表示的是那些永远不存在的值的类型。
 * never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
 * never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
 * object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
 * 
 * 
 * 类型断言（两种写法）
 * 1. 尖括号<>
 *    let someValue: any = "this is a string";
 *    let strLength: number = (<string>someValue).length;
 * 2. as语法 
 *    let someValue: any = "this is a string";
 *    let strLength: number = (someValue as string).length;
 */


/**
 * 接口：能够描述js中对象拥有的各种各样的外形，除了描述带有属性的普通对象外，还可以描述函数类型。
 * 1. 接口的属性不全都是必须的。
 * 2. 描述函数类型的时候，需要给接口定义一个调用签名
 */

/**
 * 函数类型包含：参数类型和返回值类型。
 * 返回值类型是函数类型的必要部分，如果函数没有任何返回值，也必须要指定返回值类型未void。
 * 在函数和返回值类型之间使用 => 符号。
 * 函数的可选参数必须跟在必须参数的后面。
 * 在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。
 * 带默认值的参数 不需要 放在必须参数的后面。
 * 如果带默认值的参数出现在必须参数的前面，用户必须明确的传入 undefined值 来获得默认值。
 * 
 * 泛型变量
 * 
 */


 interface SearchFunc {
   (source: string, subString: string): boolean
 }
let mySearch: SearchFunc = function(source, subString) {
  let res = source.search(subString)
  return res > -1
};

interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: number       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

let a: NumberDictionary = {name: '23'};
console.log(a, 'aaaa')

console.log(mySearch('123', '456'), 'mySearch')

const Home = (props) => {
  // console.log('首页===>>>', props)
  return (
    <div >
      <p>这是布尔值</p>
    </div>
  )
}

export default inject('store')(observer(Home))