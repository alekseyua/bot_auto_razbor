import React from 'react';
import classNames from 'classnames';

import style from './styles/index.module.scss';

const Offset = ({ mb = 0, mt=0, children,addClass }) => {
  return (
    <div
      className={classNames({
        [style['offset']]: true,
        [addClass]: !!addClass,
        [style[`mb--${mb}`]]: !!mb,
        [style[`mt--${mt}`]]: !!mt,
      })}
    >{children}</div>
  );
};

export default React.memo(Offset);
