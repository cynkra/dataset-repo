import React from 'react';
import immutable from 'immutable';
import DocumentTitle from 'react-document-title';
import Component from '../common/component.react';
import ContributorsChart from '../contributors/contributorsChart.react';
import {fetchContributors} from '../contributors/actions';
import {getNameWithTooltip} from '../../lib/helpers';

require('./aboutPage.styl');

export default class AboutPage extends Component {

  static propTypes = {
    contributors: React.PropTypes.instanceOf(immutable.Map).isRequired
  }

  componentWillMount() {
    return fetchContributors();
  }

  render() {
    const contributors = this.props.contributors.get('list');

    const leftMargin = contributors.reduce((prev, next) => {
      const x = prev.name ? prev.name.toString().length : prev;
      const y = next.name ? next.name.toString().length : next;
      return x > y ? x : y;
    }) || 100;

    return (
      <DocumentTitle title='About'>
        <section className='content'>
          <section className='About-section'>
            <h1>Purpose of the repository</h1>
            <p>
              There are nice repositories of propositional (e.g. <a href="http://archive.ics.uci.edu/ml/">UCI</a>) and graph datasets (e.g. <a href="http://snap.stanford.edu/data/">SNAP</a>) on the web. However, until now, there wasn't any bigger repository of relational datasets in a common format. And the lack of such repository in past had unpleasant consequences. Empirical evaluations of algorithms were limited to a few datasets, since it was difficult to obtain more datasets. Results from different authors were hard to compare, because different versions of the same dataset were in the world. And the progress in the relational machine learning stalled, because scientists were unaware of problems absent in their datasets.
            </p>
            <p>
              The purpose of the relational repository is to rectify the situation and provide a diverse set of publicly available relational datasets.
            </p>
          </section>

          <section className='About-section'>
            <h2>FAQ</h2>
            <dl className='About-faq'>
              <dt>Why the datasets are not stored in CSV files?</dt>
              <dd>
                Because CSV files don't store information about data types, PK, FK, indexes and constrains.
              </dd>

              <dt>Why MySQL database?</dt>
              <dd>
                Because in combination with <a href="http://clowdflows.org">ClowdFlows</a> you can process the datasets online! <br />
                Just open one of the public workflows (like <a href="http://clowdflows.org/workflows/copy-workflow/2222">Wordification</a> or <a href="http://clowdflows.com/workflow/4018">Cross-validation</a>), change the credentials in "MySQL Connect" operator to the credentials from the repository and you are ready to go!
              </dd>

              <dt>Why do the datasets contain missing values/composite keys/strange data types/any other ugly thing you may think of?</dt>
              <dd>
                Because they are also present in the real datasets.
              </dd>

              <dt>What's the point of including artificial datasets?</dt>
              <dd>
                While datasets like Adventure Works may not contain any pattern that could be found during modeling, they still increase the diversity of the repository. For example, the named Adventure Works dataset has the highest table count in the whole repository. <br />
                If your algorithm can process all the tables present in Adventure Works, it may be able to process real world datasets.
              </dd>
            </dl>
          </section>

          <section className='About-section'>
            <h2>Summary Statistics</h2>
            <table className='About-statistics'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>{getNameWithTooltip('#Relations')}</th>
                  <th>{getNameWithTooltip('#Attributes')}</th>
                  <th>{getNameWithTooltip('#Tuples')}</th>
                  <th>{getNameWithTooltip('#Instances')}</th>
                  <th>{getNameWithTooltip('Size')}</th>
                  <th>{getNameWithTooltip('Type')}</th>
                  <th>{getNameWithTooltip('Domain')}</th>
                  <th>{getNameWithTooltip('Task')}</th>
                  <th>{getNameWithTooltip('Missing values')}</th>
                  <th>{getNameWithTooltip('Loops')}</th>
                  <th>{getNameWithTooltip('Compound keys')}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>sum OR mean</td>
                  <td>percentage</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tfoot>
            </table>
          </section>

          <section className='About-section'>
            <h2>Classifier's Ranking</h2>
            <p>Bigger value is better.</p>
          </section>

          <section className='About-section'>
            <h2>Top Contributors</h2>
            <ContributorsChart
              data={contributors}
              height={contributors.count() * 75}
              margins={{top: 0, right: 20, bottom: 20, left: (leftMargin + 2) * 8}}
              title=''
              width={992}
            />
          </section>
        </section>
      </DocumentTitle>
    );
  }

}
