import React from 'react';
import Component from '../common/component.react';

export default class DatasetInfoDownload extends Component {

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
              <li>password (six stars): ******</li>
            </ul>
          </li>
          <li>
            Export the database in your favourite format.
          </li>
        </ol>
      </div>
    );
  }

}