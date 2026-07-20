<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap | FUERA</title>
        <meta charset="UTF-8"/>
        <style>
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #070709;
            color: #e4e4e7;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #111115;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          }
          h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 28px;
            margin-top: 0;
            color: #ffffff;
            letter-spacing: -0.5px;
          }
          p.desc {
            color: #a1a1aa;
            font-size: 14px;
            margin-bottom: 24px;
            line-height: 1.6;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background-color: #18181b;
            color: #ffffff;
            text-align: left;
            padding: 12px 16px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            font-size: 14px;
          }
          tr:hover td {
            background-color: rgba(255,255,255,0.02);
          }
          a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
            color: #a1a1aa;
          }
          .badge {
            background: rgba(255,255,255,0.1);
            color: #d4d4d8;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>FUERA XML Sitemap Index</h1>
          <p class="desc">
            This is an XML Sitemap generated for search engine crawlers (Google, Bing, Yahoo).
            It contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs available on <strong>FUERA</strong>.
          </p>
          <table>
            <thead>
              <tr>
                <th>URL Location</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="badge"><xsl:value-of select="sitemap:changefreq"/></span>
                  </td>
                  <td>
                    <span class="badge"><xsl:value-of select="sitemap:priority"/></span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </template>
</xsl:stylesheet>
