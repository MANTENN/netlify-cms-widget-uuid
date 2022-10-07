import { v4 } from "uuid";
import PropTypes from "prop-types";

import React from "react";

const truthy = () => ({ error: false });

export class UuidControl extends React.Component {
  handleRegenerate() {}

  processInnerControlRef = (ref) => {
    if (!ref) return;

    /**
     * If the widget is a container that receives state updates from the store,
     * we'll need to get the ref of the actual control via the `react-redux`
     * `getWrappedInstance` method. Note that connected widgets must pass
     * `withRef: true` to `connect` in the options object.
     */
    const wrappedControl = ref.getWrappedInstance
      ? ref.getWrappedInstance()
      : ref;

    this.wrappedControlValid = wrappedControl.isValid || truthy;

    /**
     * Get the `shouldComponentUpdate` method from the wrapped control, and
     * provide the control instance is the `this` binding.
     */
    const { shouldComponentUpdate: scu } = wrappedControl;
    this.wrappedControlShouldComponentUpdate = scu && scu.bind(wrappedControl);
  };

  shouldComponentUpdate(nextProps) {
    /**
     * Allow widgets to provide their own `shouldComponentUpdate` method.
     */
    if (this.wrappedControlShouldComponentUpdate) {
      return this.wrappedControlShouldComponentUpdate(nextProps);
    }
    return (
      this.props.value !== nextProps.value ||
      this.props.classNameWrapper !== nextProps.classNameWrapper ||
      this.props.hasActiveStyle !== nextProps.hasActiveStyle
    );
  }

  validateWrappedControl = (field) => {
    return { error: false };
  };

  render() {
    const { forID, value, onChange, classNameWrapper } = this.props;

    return (
      <div style={{ display: "flex" }} ref={this.processInnerControlRef}>
        <input
          type="hidden"
          id={forID}
          className={classNameWrapper}
          value={value || v4()}
          onChange={(e) => onChange(e.target.value.trim())}
        />
        <div>{value || v4()}</div>
        <button
          onClick={() => {
            onChange(v4());
          }}
          style={{ marginLeft: "1em" }}
        >
          Regenerate ID
        </button>
      </div>
    );
  }
}

UuidControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  forID: PropTypes.string,
  value: PropTypes.node,
  classNameWrapper: PropTypes.string.isRequired,
};

UuidControl.defaultProps = {
  value: "",
};

export function UuidPreview({ value }) {
  return <div>{value}</div>;
}

UuidPreview.propTypes = {
  value: PropTypes.node,
};
