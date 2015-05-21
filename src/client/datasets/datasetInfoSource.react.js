import PureComponent from '../common/purecomponent.react';
import React from 'react';

export default class DatasetInfoSource extends PureComponent {

  renderBibtex() {
    const bibtex = '/assets/bibtex/' + this.props.bibtex;
    return (
      <span> (<a href={bibtex}>BibTeX</a>)</span>
    )
  }

  render() {
    const origin = this.props.origin;
    const originText = (origin && origin.split('/').length >= 2 ? origin.split('/')[2] : origin);
    const bibtex = this.props.bibtex;
    return origin ? (
      <p>
        Original source: <a href={origin}>{originText}</a>
        {bibtex ? this.renderBibtex() : null}
      </p>
    ) : null;
  }
}

DatasetInfoSource.propTypes = {
  origin: React.PropTypes.string,
  bibtex: React.PropTypes.string
};
