import React from 'react';
import FilterGroup from './filtergroup.react';
import {Map} from 'immutable';

export default class Filter extends React.Component {

  render() {
    const values = this.props.values;
    return (
      <div className='filter'>
        <FilterGroup
          checked={values.get('databaseSize')}
          displayName='Size'
          name='databaseSize'
          values={['KB', 'MB', 'GB']}
        />

        <FilterGroup
          checked={values.get('tableCount')}
          displayName='Tables'
          name='tableCount'
          values={['0-10', '10-30', '30+']}
        />

        <FilterGroup
          checked={values.get('type')}
          displayName='Type'
          name='type'
          values={['Real', 'Synthetic']}
        />

        <FilterGroup
          checked={values.get('domain')}
          displayName='Domain'
          name='domain'
          values={['Education', 'Financial', 'Geographical', 'Gouverment', 'Logistic', 'Medical', 'Recommendation', 'Retail', 'Sport']}
        />

        <FilterGroup
          checked={values.get('missingValues')}
          displayName='Missing values'
          name='missingValues'
          values={['Missing values']}
        />

        <FilterGroup
          checked={values.get('dataType')}
          displayName='Data type'
          name='dataType'
          values={['Date', 'Geo', 'Lob', 'Numeric', 'String']}
        />
      </div>
    );
  }

}

Filter.propTypes = {
  values: React.PropTypes.instanceOf(Map)
};