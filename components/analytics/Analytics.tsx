// Analytics — pure server component, renders script tags into <head>
// Add your IDs to .env.local:
//   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
//   NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx

export default function Analytics() {
  const GA = process.env.NEXT_PUBLIC_GA_ID ?? '';
  const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID ?? '';

  return (
    <>
      {GA && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`,
            }}
          />
        </>
      )}
      {CLARITY && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");`,
          }}
        />
      )}
    </>
  );
}
