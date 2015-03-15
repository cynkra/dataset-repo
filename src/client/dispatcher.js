import {Dispatcher} from 'flux'

const dispatcher = new Dispatcher

export function register(callback: Function): string {
  return dispatcher.register(callback)
}

export function dispatch(action: Function, data: ?Object) {
  if ('production' != process.env.NODE_ENV) {
    console.log(action)
  }

  dispatcher.dispatch({action, data})
}
