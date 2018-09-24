import React from 'react';

const SingleGraphBar = ({ vertical = false, num, denom, barColor, bgColor, thickness }) => {
  if (barColor && barColor.length > 0) {
    return (
      <div className="outer-bar" style={{ height: thickness, width: '100%', background: bgColor }}>
        <div className="main-bar" style={{ flex: num, background: barColor }}>
          {`${(num / denom) * 100} %`}
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
        <div className="main-bar" style={{ flex: num }} />
        <div
          className="space"
          style={{ flex: denom - num, background: 'transparent', paddingLeft: '1rem' }}
        >
          {`${(num / denom) * 100} %`}
        </div>
      </div>
    );
};

export default SingleGraphBar;
