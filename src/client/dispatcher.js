import flux from 'flux'

export default new class Dispatcher extends flux.Dispatcher {

  dispatch(action: Function, data: Object) {
    super.dispatch({action, data})
  }

}
