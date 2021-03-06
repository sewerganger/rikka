import React, { FC } from 'react';
import { handleSize, accordType, existStr } from '@/utils';

const Icon: FC<any> = function(props) {
  const { size, src, style, className, ...rest } = props;

  return (
    <i
      className={'icon ' + existStr(className)}
      {...rest}
      style={{
        ...accordType(handleSize(size), 'Object', {}),
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'inline-block',
        verticalAlign: '-0.125em',
        ...style
      }}
    />
  );
};

Icon.defaultProps = {
  size: [14, 14]
};

export default Icon;
