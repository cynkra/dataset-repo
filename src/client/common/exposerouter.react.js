import React from 'react';

export default function exposeRouter(Component) {

  class ExposeRouter extends React.Component {
    render() {
      return <Component {...this.props} router={this.context.router} />;
    }
  }

  ExposeRouter.contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  return ExposeRouter;
}
