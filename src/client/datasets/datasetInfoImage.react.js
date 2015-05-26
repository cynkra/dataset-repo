import PureComponent from '../common/purecomponent.react';
import React from 'react';
import {checkImage} from '../../lib/helpers';

export default class DatasetInfoImage extends PureComponent {
  constructor(props) {
    super(props);

    if (!props.image && props.schema) {
      const image = '/assets/img/datasets-generated/' + props.schema + '.png';
      if (checkImage(image)) {
        this.state = {
          image: image
        };
      } else {
        if (!process.env.IS_BROWSER) {
          const sqlViz = require('../../services/sqlviz/sqlviz.js');
          sqlViz.getSchema(props.schema);
        }
        this.state = {
          image: null
        };
      }
    } else {
      this.state = {
        image: props.image || null
      };
    }
  }

  render() {
    const title = this.props.title;
    const image = this.state.image;

    return (
      <div className='DatasetInfo-image'>
        { image
          ? <a href={image}><img alt={title} src={image} title={title} /></a>
          : null}
      </div>
    );
  }
}

DatasetInfoImage.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
  schema: React.PropTypes.string
};
