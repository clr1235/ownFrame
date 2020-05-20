import React, {
  Component,
  PureComponent,
  useState,
  Fragment
} from 'react';

class App extends PureComponent{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="app_page">
        这是app页面，我就想试下打包成功不 
      </div>
    )
  }
}

export default App;
