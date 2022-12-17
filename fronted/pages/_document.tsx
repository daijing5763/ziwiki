import Document,{Html,Head,Main,NextScript} from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head ><link rel="shortcut icon" href="/logo.svg" /></Head>
        <body>
          <Main />
          <NextScript />
          <div id="mysearch"/>
        </body>
      </Html>
    )

  }
}
export default MyDocument;