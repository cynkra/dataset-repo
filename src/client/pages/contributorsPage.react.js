import DocumentTitle from 'react-document-title';
import React from 'react';
import ContributorsChart from '../contributors/contributorsChart.react';
import {getContributors} from '../contributors/store';
import {fetchContributors} from '../contributors/actions';

export default class ContributorsPage extends React.Component {

  componentWillMount() {
    return fetchContributors();
  }

  render() {
    const contributors = getContributors();
    const data = contributors.map((contributor) => {
      return {
        label: contributor.get('name'),
        value: contributor.get('count')
      };
    });
    const leftMargin = data.reduce((prev, next) => {
      const x = prev.label ? prev.label.toString().length : prev;
      const y = next.label ? next.label.toString().length : next;
      return x > y ? x : y;
    }) || 100;

    return (
      <DocumentTitle title="Contributors">
        <section className="content">
          <ContributorsChart
            data={data.toArray()}
            height={data.count() * 100}
            margins={{top: 0, right: 20, bottom: 20, left: (leftMargin + 2) * 8}}
            title='Contributors'
            width={992}
          />
        </section>
      </DocumentTitle>
    );
  }
}
