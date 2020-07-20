import { v1 } from 'uuid';
import PropTypes from 'prop-types';
import React from 'react';

export class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    return (
      <>
      <input
        type="hidden"
        id={forID}
        className={classNameWrapper}
        value={value || v1()}
        onChange={e => onChange(e.target.value.trim())}
      />
      <div>{value || v1()}</div>
      </>
    );
  }
}

export function Preview({ value }) {
  return <div>{ value }</div>;
}

Preview.propTypes = {
  value: PropTypes.node,
};
