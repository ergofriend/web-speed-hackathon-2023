export { Page };

function Page(pageProps: { is404: boolean }) {
  if (pageProps.is404) {
    // Return a UI component "Page Not Found."
    return <div>Page Not Found.</div>;
  } else {
    // Return a UI component "Our server is having problems. Sincere apologies. Try again later."
    return <div>Our server is having problems. Sincere apologies. Try again later.</div>;
  }
}
