import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';

import * as styles from './Fallback.styles';

export const Fallback: FC<FallbackProps> = () => {
  // useEffect(() => {
  //   console.log(props.error);
  // }, [props.error]);
  return (
    <>
      <Helmet>
        <title>エラーが発生しました</title>
      </Helmet>
      <Layout>
        <div className={styles.container()}>
          <div className={styles.inner()}>
            <p className={styles.mainParagraph()}>エラーが発生しました</p>
            <p className={styles.subParagraph()}>Some error has occurred</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
