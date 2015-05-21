import PureComponent from '../common/purecomponent.react';
import React from 'react';

export default class DatasetInfoImage extends PureComponent {
  render() {
    const title = this.props.title;
    const schema = this.props.schema;
    if(!process.env.IS_BROWSER && !this.props.image && schema) {
      const fs = require('fs');
      const path = require('path');
      if(!fs.existsSync(path.join(__dirname, '..','..','..','assets','img','datasets-generated',schema+'.png'))) {
        const sqlViz = require('../../services/sqlviz/sqlviz.js');
        sqlViz.getSchema(schema);
      }
    }
    const image = this.props.image
      ? '/assets/img/datasets/' + this.props.image
      : (schema
          ? '/assets/img/datasets-generated/' + schema + '.png'
          : null);

    return (
      <div className='DatasetInfo-image'>
        {image ? <a href={image}><img src={image} alt={title} title={title} /></a> : null}
      </div>
    );
  }
}

DatasetInfoImage.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
  schema: React.PropTypes.string
};
