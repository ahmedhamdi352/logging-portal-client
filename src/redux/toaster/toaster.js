import { toast } from 'react-toastify';
import React from 'react';
import { ReactComponent as CheckedSvg } from './checked.svg';
import { ReactComponent as CancelSvg } from './cancel.svg';

import { css } from 'glamor';

export default {
  // Keep the signature of the original toast object
  // Doing so you can pass additionnal options

  success(msg, options = {}) {
    const Success = () => (
      <div style={{ padding: '1%' }}>
        <div className="Toastify-msg">
          <CheckedSvg /> {msg ? msg : 'Saved Succesfully'}
        </div>
      </div>
    );
    return toast(<Success />, {
      ...options,
      className: css({
        backgroundColor: '#fff',
        border: '1px solid #ebedf0',
        borderTopColor: 'rgb(235, 237, 240)',
        borderTopStyle: 'solid',
        borderTop: '2px solid #6ac259',
        boxShadow: '0 -1px 6px 0 rgba(0, 0, 0, 0.1)',
      }),
    });
  },

  error(msg = 'Something Wrong,Try again', details, options = {}) {
    const Error = () => (
      <div style={{ padding: '1%' }}>
        <div className="Toastify-msg" style={{ color: '#001433', fontSize: '14px', whiteSpace: 'pre-line' }}>
          <CancelSvg /> {msg}
          <br />
          {details.map((err) => `${err.message}\n`)}
        </div>
      </div>
    );
    return toast(<Error />, {
      ...options,
      className: css({
        backgroundColor: '#fff',
        border: '1px solid #ebedf0',
        borderTopColor: 'rgb(235, 237, 240)',
        borderTopStyle: 'solid',
        borderTop: '2px solid #f15249',
        boxShadow: '0 -1px 6px 0 rgba(0, 0, 0, 0.1)',
      }),
    });
  },
};
