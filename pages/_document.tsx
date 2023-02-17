import { Html, Head, Main, NextScript } from 'next/document'

import React from 'react'

type Props = {}

const Document = (props: Props) => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document
