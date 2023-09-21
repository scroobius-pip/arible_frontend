import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {CssBaseline.flush()}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KTG7GWC8');
              `}}
          />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`
            }}
          /> */}
          {/* <script
            async
            src='https://r.wdfl.co/rw.js'
            data-rewardful='d3fa51'
          /> */}
          <script
            defer
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ghlojuytr0");
              `,
            }}
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-N2Y0XZCXYV"></script>
          <script

            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-N2Y0XZCXYV');
              `,
            }}
          />
          {/* <script type="text/javascript"></script> */}

          {/* <script defer
            dangerouslySetInnerHTML={{
              __html: `
              window.$crisp=[];window.CRISP_WEBSITE_ID="b4953aeb-ba1b-4a05-af7b-47eb9629a5ee";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
              `,
            }}
          /> */}


          <script
            dangerouslySetInnerHTML={{
              __html: `
              function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M9JK658');
              `,
            }}
          />


          <meta name="color-scheme" content="dark" />
          {/* <meta name="title" content="Arible AI Portraits: Professional Portrait Picture AI For Social Media & LinkedIn" />
          <meta name="description" content="Arible uses photos of your face to create photorealistic or realistic pictures of you that are indistinguishable from reallife. These can be used for profile pictures on social media or linkedin. Unlike other platforms you don't need existing photos of yourself, instead Arible uses a virtual photobooth (via your selfie camera) to take good samples of your face. Arible comes with 1000+ styles to choose from, or use your own" /> */}

          {
            ['', 'twitter:title,twitter:description', 'og:title,og:description'].map((item, index) => {
              const [title, description] = item.split(',')
              return <>
                <meta name='title' property={title} content={metaTitle} />
                <meta name='description' property={description} content={metaDescription} />
              </>
            })
          }

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://arible.co/" />
          {/* <meta property="og:title" content="Arible Avatars & Virtual Studio: Professional Photography Without Photographers Or The Camera" />
          <meta property="og:description" content="Unlimited Realistic or Artistic photos of yourself and others monthly" /> */}
          <meta property="og:image" content="https://arible.co/preview.jpg" />


          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.arible.co/" />
          {/* <meta property="og:title" content="Arible Avatars & Virtual Studio: Professional Photography Without Photographers Or The Camera" />
          <meta property="og:description" content="Unlimited Realistic or Artistic photos of yourself and others monthly" /> */}
          <meta property="og:image" content="https://arible.co/preview.jpg" />

          <meta name="p:domain_verify" content="ee356558185edfa82c3502748c9491b8" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://arible.co/" />
          {/* <meta property="twitter:title" content="Arible Avatars & Virtual Studio: Professional Photography Without Photographers Or The Camera" /> */}
          {/* <meta property="twitter:description" content="Unlimited Realistic or Artistic photos of yourself and others monthly" /> */}
          <meta name="twitter:image" content="https://arible.co/preview.jpg"></meta>
          {/* <meta name='pgbt:source' content='https://arible.co/' /> */}
          {/* <meta name='pgbt:source' data-expires='3600' /> */}
          {/* <meta name='pgbt:source' content='https://arible.co/faq' data-expires='3600' />
          <meta name='pgbt:source' content='https://arible.co/main' data-expires='600' />
          <meta name='pgbt:source' content='https://arible.co/faq' data-expires='600' /> */}
          {/* <meta name='pgbt:source' content='hello world' data-expires='600' /> */}
          {/* 
          <meta name='pgbt:qa' data-question='What is the meaning of life?' data-answer='42' />
          <meta name='pgbt:qa' data-question='Is this the real life?' data-answer='Is this just fantasy?' />
          <meta name='pgbt:qa' data-question='But what about the children?' data-answer='What about the children?' /> */}

          <script id='pgbt' data-pgbt_id="1059050779408717183" src='https://s.thepagebot.com/pgbt_1.0.3.js' />
          {/* <meta name='pgbt:source' content='https://nextui.org/docs/getting-started' /> */}
          {/* https://nextui.org/docs/getting-started */}
        </Head>

        <body>

          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTG7GWC8"
            height="0" width="0" style={{
              display: 'none',
              visibility: 'hidden'
            }}></iframe></noscript>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M9JK658"
              height="0" width="0" className="hidden invisible">
            </iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const metaTitle = "Arible AI Portraits: Professional Portrait Picture AI For Social Media & LinkedIn";
const metaDescription = "AI portrait profile pictures of you. Photography AI for Twitter, LinkedIn, Facebook, Instagram, TikTok, and more. Unlimited realistic or artistic profile photos of yourself and others monthly. ";
export default MyDocument;