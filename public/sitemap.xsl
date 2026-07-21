<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - FUERA</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #09090b;
            color: #f4f4f5;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
          }
          .header {
            margin-bottom: 28px;
            padding-bottom: 20px;
            border-bottom: 1px solid #27272a;
          }
          h1 {
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 8px 0;
            color: #ffffff;
          }
          p.desc {
            color: #a1a1aa;
            font-size: 14px;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #18181b;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #27272a;
          }
          th {
            background: #27272a;
            color: #e4e4e7;
            text-align: left;
            padding: 12px 16px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          td {
            padding: 12px 16px;
            border-top: 1px solid #27272a;
            font-size: 14px;
            color: #d4d4d8;
            word-break: break-all;
          }
          tr:hover td {
            background: rgba(255, 255, 255, 0.02);
          }
          a {
            color: #38bdf8;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            background: #27272a;
            color: #a1a1aa;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap</h1>
            <p class="desc">Generated for FUERA. This document helps search engine crawlers index the site pages.</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
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
  </xsl:template>
</xsl:stylesheet>
