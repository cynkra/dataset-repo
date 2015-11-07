import React from 'react';
import Component from '../common/component.react';
import DatasetType from './dataset';

export default class DatasetInfoDownload extends Component {

  static propTypes = {
    dataset: React.PropTypes.instanceOf(DatasetType).isRequired
  }

  render() {
    return (
      <div className='DatasetInfoDownload'>
        <h2>How to download the dataset</h2>
        <p>
          The datasets are publicly available directly from MySQL database.
        </p>
        <ol>
          <li>
            Open your favourite MySQL client (for example <a href='http://www.mysql.com/products/workbench/'>MySQL Workbench</a>)
          </li>
          <li>
            Use following credentials:
            <ul>
              <li>hostname: relational.fit.cvut.cz</li>
              <li>port: 3306</li>
              <li>username: guest</li>
              <li>password: relational</li>
            </ul>
          </li>
          <li>
            Export "{this.props.dataset.title}" database (or other version of the dataset, if available) in your favourite format (e.g. CSV or SQL dump).
          </li>
        </ol>
      </div>
    );
  }

}
