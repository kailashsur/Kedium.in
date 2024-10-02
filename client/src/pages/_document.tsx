import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className=" h-full w-full">
      <Head />
      <body
        className="h-full w-full bg-primary-background text-primary-text

      pt-16
      "
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
// dark:bg-primary-dart-background dark:text-primary-dark-text
