
import {observable, action, computed, runInAction, flow} from 'mobx';
import BaseStore, { protecte } from './store-extend.js';
import {debounce} from 'lodash';
// import logo_img from '@common-components/Logo/src/img/logo-ico.svg';
const ACCOUNT = window.ACCOUNT || {};
let { theme_logo = {}, theme_color={} } = ACCOUNT;

class GlobalStore extends BaseStore{

  @protecte
  @observable noHeader = true;

  @protecte
  @observable noFooter = true;
  @observable theme_logo = {
    logo_type: theme_logo.logo_type || 1,
    logo_url: theme_logo.logo_url
  };

  @observable theme_color = {
    color_type: theme_color.color_type || 1,
    color: theme_color.color
  };
  @action setState = debounce((state = {}) => {
    runInAction(() => {
      Object.keys(state).forEach((key) =>{
        let value = state[key];
        this[key] = value;
      })
    });
  }, 30);

  // @action toggleHeader = debounce((showHeader) => {
  //   runInAction(() => {
  //     this.noHeader = showHeader;
  //   });
  // }, 30);
  //
  // @action toggleFooter = debounce((showFooter) => {
  //   runInAction(() => {
  //     this.noFooter = showFooter;
  //   })
  // }, 30);

}

export default new GlobalStore();
