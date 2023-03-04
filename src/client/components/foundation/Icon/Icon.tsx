import classNames from 'classnames';
import type { FC } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlay, FaShoppingCart, FaUser } from 'react-icons/fa';

import * as styles from './Icon.styles';

const Icons = {
  FaArrowLeft: FaArrowLeft,
  FaArrowRight: FaArrowRight,
  FaCheckCircle: FaCheckCircle,
  FaPlay: FaPlay,
  FaShoppingCart: FaShoppingCart,
  FaUser: FaUser,
};

type Props = {
  type: keyof typeof Icons;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  const Icon = Icons[type];
  return (
    <span className={classNames(type, styles.container({ color, height, width }))}>
      <Icon />
    </span>
  );
};
