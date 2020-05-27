import React from 'react'
import { observer, inject } from 'mobx-react'
import {toJS} from 'mobx'
// import { useLocalStore, useObserver } from "mobx-react-lite"

interface loginInterface {
  title: string,
  value: string
}

const Login: React.FC<loginInterface> = ({store}) => {
  console.log(toJS(store), '注入进来的store')
  return (
    <div >
      这是登录页面
    </div>
  )
}

export default inject('store')(observer(Login))


