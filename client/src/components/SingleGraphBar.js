import React from 'react';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons';

const SingleGraphBar = ({ num, denom, barColor, bgColor, thickness }) => {
  if (barColor && barColor.length > 0) {
    return (
      <div className="outer-bar" style={{ height: thickness, width: '100%', background: bgColor }}>
        <div
          className="main-bar"
          style={{ flex: num /* , background: barColor */, color: bgColor }}
        >
          <Transition
            native
            impl={TimingAnimation}
            config={{ duration: 1500, easing: Easing.linear }}
            from={{ right: 'auto' }}
            enter={{ right: 0 }}
          >
            {style => <animated.div className="fill" style={{ ...style, background: barColor }} />}
          </Transition>
          <div className="percentage-text">{`${(num / denom) * 100} %`}</div>
        </div>
        <div
          className="space"
          style={{ flex: denom - num, background: 'transparent', paddingLeft: '1rem' }}
        />
      </div>
    );
  }
  return (
    <div className="outer-bar" style={{ height: thickness, width: '100%', background: bgColor }}>
      <Transition
        native
        impl={TimingAnimation}
        config={{ duration: 1500, easing: Easing.linear }}
        from={{ flex: 0 }}
        enter={{ flex: num }}
      >
        {style => <animated.div className="main-bar with-bg-img" style={{ ...style }} />}
      </Transition>

      <div
        className="space"
        style={{ flex: denom - num, background: 'transparent', paddingLeft: '1rem' }}
      >
        {`${(num / denom) * 100} %`}
      </div>
    </div>
  );
};

SingleGraphBar.defaultProps = {
  barColor: '',
  bgColor: 'transparent'
};

SingleGraphBar.propTypes = {
  num: PropTypes.number.isRequired,
  denom: PropTypes.number.isRequired,
  barColor: PropTypes.string,
  bgColor: PropTypes.string,
  thickness: PropTypes.number.isRequired
};

export default SingleGraphBar;
