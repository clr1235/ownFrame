import React, { Component } from 'react';
import { action } from 'mobx';
import { isFunction } from 'lodash';

/**
 * store 基类
 * 提供公共 destroy 方法
 */
export default class BaseStore {
  constructor() {
    let protectedAttrs = this.constructor.__protectedAttrs__;
    for (let key in this) {
      let value = this[key];
      if (
        !isFunction(value) && (!protectedAttrs || !~protectedAttrs.indexOf(key))
      ) {
        (() => {
          this[`__initial_${key}__`] = action(() => {
            this[key] = value;
          });
        })(key, value);
      }
    }
  }

  // loadnotify() {
  //   return require('@global-components/Loadnotify')
  // }

  destroy() {
    for (let key in this) {
      let handler = this[`__initial_${key}__`];
      if (isFunction(handler)) {
        handler.call(this);
      }
    }
  }
}

/**
 * @description 将 store 和组件进行关联
 *              组件在实例化时增加 store 的引用计数
 *              组件卸载时减少计数
 *              当计数为 0 时，需要对 store 上的数据做销毁
 * @param {Array} store
 */
export function inject(...store) {
  return function (ComposeComponent) {
    return class ObservedComponent extends Component {
      constructor(...args) {
        super(...args);

        store.forEach((storeItem) => {
          storeItem.__referenceCounting__ = (storeItem.__referenceCounting__ || 0) + 1;
        });
      }

      componentWillUnmount() {
        store.forEach((storeItem) => {
          if (storeItem.__referenceCounting__ > 0) {
            --storeItem.__referenceCounting__;
          }

          !storeItem.__referenceCounting__ &&
            isFunction(storeItem.destroy) && storeItem.destroy();
        });
      }

      render() {
        return (
          <ComposeComponent
            {...this.props}
          />
        );
      }
    };
  }
}

/**
 * @description 将一个 store 的指定属性设置为受保护状态
 *              受保护属性的值不会在组件卸载时被销毁
 *
 * @param {Object} store
 * @param {String} key
 *
 */
export function protecte(store, key) {
  let storeConstructor = store.constructor;
  let protectedAttrs = storeConstructor.__protectedAttrs__ = storeConstructor.__protectedAttrs__ || [];
  if (!~protectedAttrs.indexOf(key)) {
    protectedAttrs.push(key);
  }
}
