<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xmlns:func="http://www.fiepr.org.br">
  <xsl:output method="xhtml" indent="yes" encoding="ISO-8859-1"/>
  
  <!-- Includes -->
  <xsl:include href="../functions.xsl"/>
  <xsl:include href="../partials/meta.xsl"/>

  <!-- Template -->
  <xsl:template match="webp">
    <xsl:text disable-output-escaping="yes"><![CDATA[<!DOCTYPE html>]]></xsl:text>
    <html>
      <head>
        <!-- Meta Tags -->
        <xsl:call-template name="meta"/>

        <!-- Vendor CSS -->
        <!-- <link rel="stylesheet" type="text/css" href="{site/url}vendors-d6a2765322.css"/> -->

        <!-- Application CSS -->
        <!-- <link rel="stylesheet" type="text/css" href="{site/url}main-c387b7ec01.css"/> -->

        <!-- Fonts -->
        <link rel="stylesheet" href="https://use.typekit.net/dsf4bil.css"/>
        <link rel="stylesheet" href="https://use.typekit.net/pul8mdv.css"/>
        <link rel="stylesheet" href="https://use.typekit.net/fgx7rql.css"/>
      </head>
      <body>
        <div id="root"></div>

        <!-- Vendor Scripts -->
        <script src="https://unpkg.com/feather-icons"></script>

        <!-- Application Scripts -->
        <script src="{site/url}editor-vendor.f5d1deaf03f3fc9408db.js" charset="UTF-8"></script>
        <script src="{site/url}editor.69fa906528ada76b4a44.js" charset="UTF-8"></script>

        <script type="text/javascript" charset="UTF-8">
          window.webp = {
            siteUrl: "<xsl:value-of select="site/url"/>",
          }
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>