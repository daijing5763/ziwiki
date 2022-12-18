import Document,{Html,Head,Main,NextScript} from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head ><link rel="shortcut icon" href="/logo.svg" /></Head>
        <body>
          <Main />
          <NextScript />
          <div id="mysearch" />
          <div id="create_repo"/>
        </body>
      </Html>
    )

  }
}
export default MyDocument;