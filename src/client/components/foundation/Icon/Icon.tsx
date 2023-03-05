import {
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faPlay,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import type { FC } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

import * as styles from './Icon.styles';

const Icons = {
  FaArrowLeft: faArrowLeft,
  FaArrowRight: faArrowRight,
  FaCheckCircle: faCheckCircle,
  FaPlay: faPlay,
  FaShoppingCart: faShoppingCart,
  FaUser: faUser,
};

type Props = {
  type: keyof typeof Icons;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  return (
    <span className={classNames(type, styles.container({ color, height, width }))}>
      <FontAwesomeSvgIcon icon={Icons[type]} />
    </span>
  );
};
