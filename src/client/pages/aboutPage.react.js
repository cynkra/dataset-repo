import React from 'react';
import DocumentTitle from 'react-document-title';
import Component from '../common/component.react';

require('./aboutPage.styl');

export default class AboutPage extends Component {

  render() {
    return (
      <DocumentTitle title='About'>
        <section className='content'>
          <section className='About-section'>
            <h2>Mission</h2>
            <p>
              To support growth of relational machine learning.
            </p>
          </section>

          <section className='About-section'>
            <h2>How to cite</h2>
            <p>
              Cite <a href="http://arxiv.org/abs/1511.03086">this article</a>.
            </p>
          </section>

          <section className='About-section'>
            <h2>FAQ</h2>
            <dl className='About-faq'>
              <dt>Why are the datasets not stored in CSV files?</dt>
              <dd>
                Because CSV files do not store information about data types, PKs, FKs and other constraints.
              </dd>

              <dt>Why MySQL database?</dt>
              <dd>
                Because in combination with <a href="http://clowdflows.org">ClowdFlows</a> you can process the datasets online. <br />
                Just open one of the public workflows (like <a href="http://clowdflows.org/workflows/copy-workflow/2222">Wordification</a> or <a href="http://clowdflows.com/workflow/4018">Cross-validation</a>), change the credentials in "MySQL Connect" operator to the credentials from the repository and you are ready to go!
              </dd>

              <dt>Why I am not able to connect to the database?</dt>
              <dd>
                If you are connecting to the database over a corporate network, the corporate firewalls could be the culprit. <br />
                Try to access the database with a different internet provider (e.g. with your cellular provider). If the problems persist, contact us.
              </dd>

              <dt>Why MySQL Workbench complaints about incompatible/nonstandard server version?</dt>
              <dd>
                We are using open source version of MySQL called MariaDB, hence the warning. For all purposes that the public account permits it is safe to ignore the message.
              </dd>

              <dt>What to do if I want an ILP format?</dt>
              <dd>
                See a collection of datasets at <a href="http://www-ai.ijs.si/~ilpnet2/apps/index.html">ILPnet2</a>.
              </dd>

              <dt>Why do the datasets contain missing values/composite keys/strange data types/any other ugly thing you may think of?</dt>
              <dd>
                Because they are also present in the real datasets.
              </dd>

              <dt>What's the point of including artificial datasets?</dt>
              <dd>
                While datasets like Adventure Works may not contain any pattern that could be found during modeling, they still increase the diversity of the repository. For example, the named Adventure Works dataset has the highest table count in the whole repository. <br />
                If your algorithm can process all the tables present in Adventure Works, it may be able to process real-world datasets.
              </dd>
            </dl>
          </section>
        </section>
      </DocumentTitle>
    );
  }

}
