import Link from 'next/link';
import { Trans } from '@lingui/macro';
import Head from 'next/head';

const Index = () => (
  <div>
    <Head>
      <title>Hello World.</title>
    </Head>

    <Trans>Hello World.</Trans>
    <Link href="/two">
        <Trans>Go to page 2</Trans>
    </Link>
    <br />
  </div>
);

export default Index;
