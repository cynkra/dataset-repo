import React from 'react';
import Component from '../../common/component.react.js';
import DatasetType from '../dataset';

export default class DatasetInfoDownload extends Component {

  static propTypes = {
    dataset: React.PropTypes.instanceOf(DatasetType).isRequired
  }

  render() {
    return (
      <div className='DatasetInfoDownload'>
        <h2>How to download the dataset</h2>
        <p>
          The datasets are publicly available directly from MariaDB database.
        </p>
        <ol>
          <li>
            Open your favourite MariaDB client (<a href='http://www.mysql.com/products/workbench/'>MySQL Workbench</a> works, but see <a href="https://18.198.96.193/about">FAQ</a>)
          </li>
          <li>
            Use following credentials:
            <ul>
              <li>hostname: dataset-mysql.csahpyuhcodg.eu-central-1.rds.amazonaws.com</li>
              <li>port: 3306</li>
              <li>username: guest</li>
              <li>password: relational</li>
            </ul>
          </li>
          <li>
            Export "{this.props.dataset.schema}" database (or other version of the dataset, if available) in your favourite format (e.g. CSV or SQL dump).
          </li>
        </ol>
      </div>
    );
  }

}
