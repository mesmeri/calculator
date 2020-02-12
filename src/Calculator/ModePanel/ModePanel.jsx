import React from 'react';
import './ModePanel.css';

function ModePanel(props) {
  const modes = ['loan', 'lease'];
  const buttons = modes.map(mode => {
    const cls = ['mode_btn'];
    if (props.activeMode === mode) {
      cls.push('active');
    }
    return (
      <button
        className={cls.join(' ')}
        type="button"
        value={mode}
        onClick={props.onClick}
        key={mode + Math.random()}
      >
        {mode}
      </button>
    );
  });

  return <div className="mode">{buttons}</div>;
}

export default ModePanel;
