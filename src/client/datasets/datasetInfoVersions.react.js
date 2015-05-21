import PureComponent from '../common/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {capitalize} from '../../lib/helpers';

export default class DatasetInfoVersions extends PureComponent {
  render() {
    const versions = this.props.dataset.get('versions');
    // by XXX on 12.3.2005 ?
    return versions ? (
      <div>
        <h3 className='DatasetInfo-versions-heading'>Versions</h3>
        <ul className='DatasetInfo-versions'>
          {versions.map((version, i) => {
            const title = capitalize(version.get('TABLE_SCHEMA'));
            const uploader = version.get('uploader');
            const modifications = (version.get('modifications') ? version.get('modifications').split(/,\s|\.\s/) : null);
            return (
              <li key={'version-'+i}>
                <h4>{title}</h4>
                {uploader ? <small>by {version.get('uploader')}</small> : null}
                {modifications ? (
                  <ul className='DatasetInfo-versions-modifications'>
                  {modifications.map((modification, j) => {
                    return (
                      <li key={'modification-'+i+'-'+j}>{modification}</li>
                    );
                  })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;
  }
}

DatasetInfoVersions.propTypes = {
  dataset: React.PropTypes.instanceOf(immutable.Map).isRequired
};
