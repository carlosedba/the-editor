<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xmlns:func="http://www.fiepr.org.br">
	<xsl:output method="xhtml" indent="yes" encoding="ISO-8859-1"/>

	<!-- Template -->
	<xsl:template name="meta">
		<meta charset="iso-8859-1"/>

		<!-- Início - Redirect -->
		<xsl:if test="site/component/content/flagUrlRedirectContent and site/component/content/flagUrlRedirectContent = 'true'">
			<meta http-equiv="refresh">
				<xsl:attribute name="content">
					<xsl:text disable-output-escaping="yes">0;URL=</xsl:text>
					<xsl:value-of select="site/component/content/urlRedirectContent" disable-output-escaping="yes"/>
				</xsl:attribute>
			</meta>
		</xsl:if>
		<!-- Fim - Redirect -->

		<!-- Início - Título -->
		<title>
			<xsl:choose>
				<xsl:when test="count(site/component/paginacao) = 0 and count(site/component/content) = 0">
					<xsl:for-each select="site/ancesthral">
						<xsl:value-of select="name"/>
						<xsl:if test="position() != last()">
							<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
						</xsl:if>
					</xsl:for-each>
				</xsl:when>
				<xsl:when test="count(site/component/paginacao) != 0 and count(site/component/content) != 0">
					<xsl:value-of select="site/component[1]/title"/>
					<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
					
					<xsl:for-each select="site/ancesthral">
						<xsl:value-of select="name"/>
						<xsl:if test="position() != last()">
							<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
						</xsl:if>
					</xsl:for-each>		
				</xsl:when>
				<xsl:when test="count(site/component/paginacao) = 0 and count(site/component/content) != 0">
					<xsl:value-of select="site/component[1]/content/title"/>
					<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>

					<xsl:for-each select="site/ancesthral">
						<xsl:value-of select="name"/>
						<xsl:if test="position() != last()">
							<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
						</xsl:if>
					</xsl:for-each>		
				</xsl:when>
			</xsl:choose>
		</title>
		<!-- Fim - Título -->

        <meta http-equiv="ClearType" content="on"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta http-equiv="Content-Language" content="pt-BR"/>
		<meta http-equiv="expires" content="120"/>
		<meta http-equiv="Cache-Control" content="no-store"/>
		<meta name="description" content=""/>
        <meta name="HandheldFriendly" content="True"/>
        <meta name="MobileOptimized" content="320"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui"/>

        <!-- Início - Keywords -->
		<meta name="Keywords">
			<xsl:attribute name="content">
				<xsl:value-of select="site/keywords" disable-output-escaping="yes"/>
				<xsl:value-of select="site/component/content/keywords" disable-output-escaping="yes"/>
				<xsl:value-of select="site/component/content/headerDescription" disable-output-escaping="yes"/>
			</xsl:attribute>
		</meta>
		<!-- Fim - Keywords -->

		<!-- Início - Canonical URL -->
		<xsl:choose>
			<xsl:when test="site/component/content/urlVirtualName">
				<link rel="canonical">
					<xsl:attribute name="href">
						<xsl:value-of select="site/component/content/urlVirtualName" disable-output-escaping="yes" />
					</xsl:attribute>
				</link>
			</xsl:when>
			<xsl:when test="not(site/component/content)">
				<link rel="canonical">
					<xsl:attribute name="href">
						<xsl:value-of select="site/url" disable-output-escaping="yes" />
					</xsl:attribute>
				</link>	
			</xsl:when>
		</xsl:choose>
		<!-- Fim - Canonical URL -->

		<!-- Início - Robots -->
		<xsl:if test="site/metaTagSite != '' and count(site/component/content/metaTag) = 0">
			<meta name="robots">
				<xsl:attribute name="content">
					<xsl:value-of select="site/metaTagSite" disable-output-escaping="yes"/>
					<xsl:value-of select="site/component/content/keywords" disable-output-escaping="yes"/>
					<xsl:value-of select="site/component/content/headerDescription" disable-output-escaping="yes"/>
				</xsl:attribute>
			</meta>
		</xsl:if>
		<xsl:if test="site/component/content/metaTag != ''">
			<meta name="robots">
				<xsl:attribute name="content">
					<xsl:value-of select="site/component/content/metaTag" disable-output-escaping="yes"/>
				</xsl:attribute>
			</meta>
		</xsl:if>
		<!-- Fim - Robots -->

		<!-- ******************* -->
		<!-- Início - Open Graph -->
		<!-- ******************* -->

		<!-- Início - og:title -->
		<xsl:choose>
			<xsl:when test="site/component/content/titleSocialNetwork != ''">
				<meta property="og:title">
					<xsl:attribute name="content">
						<xsl:value-of select="site/component/content/titleSocialNetwork" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
			<xsl:when test="site/titleSocialNetwork != '' and not(site/component/content)">
				<meta property="og:title">
					<xsl:attribute name="content">
						<xsl:value-of select="site/titleSocialNetwork" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
			<xsl:when test="count(site/component/paginacao) = 0 and count(site/component/content) = 0">
					<meta property="og:title">
						<xsl:attribute name="content">
							<xsl:for-each select="site/ancesthral">
								<xsl:value-of select="name"/>

								<xsl:if test="position() != last()">
									<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
								</xsl:if>
							</xsl:for-each>
						</xsl:attribute>
					</meta>
			</xsl:when>
			<xsl:when test="count(site/component/paginacao) != 0 and count(site/component/content) != 0">
				<meta property="og:title">
					<xsl:attribute name="content">
						<xsl:value-of select="site/component[1]/title"/>
						<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
						
						<xsl:for-each select="site/ancesthral">
							<xsl:value-of select="name"/>
							<xsl:if test="position() != last()">
								<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
							</xsl:if>
						</xsl:for-each>	
					</xsl:attribute>
				</meta>	
			</xsl:when>
			<xsl:when test="count(site/component/paginacao) = 0 and count(site/component/content) != 0">
				<meta property="og:title">
					<xsl:attribute name="content">
						<xsl:value-of select="site/component[1]/content/title"/>
						<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>

						<xsl:for-each select="site/ancesthral">
							<xsl:value-of select="name"/>
							<xsl:if test="position() != last()">
								<xsl:text disable-output-escaping="yes"><![CDATA[ - ]]></xsl:text>
							</xsl:if>
						</xsl:for-each>
					</xsl:attribute>
				</meta>
			</xsl:when>
		</xsl:choose>
		<!-- Fim - og:title -->

		<!-- Início - og:image -->
		<xsl:choose>
			<xsl:when test="site/component/content/urlImgRedeSocial[0] != ''">
				<meta property="og:image">
					<xsl:attribute name="content">
						<xsl:value-of select="replace(site/component/content/urlImgRedeSocial[0], '.mini', '.img')" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
			<xsl:when test="site/urlImgRedeSocial != '' and not(site/component/content)">
				<meta property="og:image">
					<xsl:attribute name="content">
						<xsl:value-of select="replace(site/urlImgRedeSocial, '.mini', '.img')" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
			<xsl:when test="site/component/content/urlImgRedeSocialNormal != ''">
				<meta property="og:image">
					<xsl:attribute name="content">
						<xsl:value-of select="site/component/content/urlImgRedeSocialNormal" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
			<xsl:when test="site/urlImgRedeSocialNormal != '' and not(site/component/content)">
				<meta property="og:image">
					<xsl:attribute name="content">
						<xsl:value-of select="site/urlImgRedeSocialNormal" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
			<xsl:when test="site/urlImgRedeSocialNormal != ''">
				<meta property="og:image">
					<xsl:attribute name="content">
						<xsl:value-of select="site/urlImgRedeSocialNormal" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
		</xsl:choose>
		<!-- Fim - og:image -->

		<!-- Início - og:description -->
		<xsl:choose>
			<xsl:when test="site/component/content/descriptionSocialNetwork != ''">
				<meta property="og:description">
					<xsl:attribute name="content">
						<xsl:value-of select="site/component/content/descriptionSocialNetwork" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
			<xsl:when test="site/descriptionSocialNetwork != '' and not(site/component/content)">
				<meta property="og:description">
					<xsl:attribute name="content">
						<xsl:value-of select="site/descriptionSocialNetwork" disable-output-escaping="yes"/>
					</xsl:attribute>
				</meta>
			</xsl:when>
		</xsl:choose>
		<!-- Fim - og:description -->

		<!-- Início - og:url -->
		<meta property="og:url">
			<xsl:attribute name="content">
				<xsl:value-of select="site/url" disable-output-escaping="yes"/>
			</xsl:attribute>
		</meta>
		<!-- Fim - og:url -->

		<!-- ******************* -->
		<!--   Fim - Open Graph  -->
		<!-- ******************* -->

		<!-- Início - Favicon -->
		<link rel="shortcut icon">
			<xsl:attribute name="href">
				<xsl:value-of select="site/url" disable-output-escaping="yes"/>
				<xsl:text disable-output-escaping="yes">favicon.ico</xsl:text>
			</xsl:attribute>
		</link>

		<link rel="icon" type="image/png">
			<xsl:attribute name="href">
				<xsl:value-of select="site/url" disable-output-escaping="yes"/>
				<xsl:text disable-output-escaping="yes">favicon.png</xsl:text>
			</xsl:attribute>
		</link>
		<!-- Fim - Favicon -->
	</xsl:template>
</xsl:stylesheet>