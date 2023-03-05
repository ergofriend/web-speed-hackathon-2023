import { css } from '@emotion/css';

export const container = ({
  ratioHeight,
  ratioWidth,
}: {
  ratioHeight: number | undefined;
  ratioWidth: number | undefined;
}) => css`
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
  position: relative;
  width: 100%;
`;
