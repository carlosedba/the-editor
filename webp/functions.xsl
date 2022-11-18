<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml" xmlns:func="http://www.fiepr.org.br">
	<xsl:output method="xhtml" indent="yes" encoding="ISO-8859-1"/>

	<xsl:template name="func:importComponent">
		<xsl:param name="name" select="''"/>

		<xsl:if test="$name != ''">
			<xsl:for-each select="site/component[nickname=$name and toShow='true']">
				<xsl:sort select="row" data-type="number"/>
				
				<xsl:if test="../../includeType = 'XML'">
					<xsl:value-of disable-output-escaping="yes" select="fileContent"/>
				</xsl:if>
				<xsl:if test="../../includeType = 'SSI'">
					<xsl:comment>#include file="<xsl:value-of select="fileInclude"/>"</xsl:comment>
				</xsl:if>
				<xsl:if test="../../includeType = 'PHP'">
					<xsl:text disable-output-escaping="yes">&#60;</xsl:text>?include("<xsl:value-of select="fileInclude"/>")?<xsl:text disable-output-escaping="yes">&#62;</xsl:text>
				</xsl:if>
			</xsl:for-each>
		</xsl:if>
	</xsl:template>

	<xsl:template name="func:importComponentFromParent">
		<xsl:param name="name" select="''"/>

		<xsl:if test="$name != ''">
			<xsl:for-each select="../component[nickname=$name and toShow='true']">
				<xsl:sort select="row" data-type="number"/>
				
				<xsl:if test="../../includeType = 'XML'">
					<xsl:value-of disable-output-escaping="yes" select="fileContent"/>
				</xsl:if>
				<xsl:if test="../../includeType = 'SSI'">
					<xsl:comment>#include file="<xsl:value-of select="fileInclude"/>"</xsl:comment>
				</xsl:if>
				<xsl:if test="../../includeType = 'PHP'">
					<xsl:text disable-output-escaping="yes">&#60;</xsl:text>?include("<xsl:value-of select="fileInclude"/>")?<xsl:text disable-output-escaping="yes">&#62;</xsl:text>
				</xsl:if>
			</xsl:for-each>
		</xsl:if>
	</xsl:template>

	<xsl:template name="func:importComponentsFromColumn">
		<xsl:param name="number" select="''"/>

		<xsl:if test="$number != ''">
			<xsl:if test="count(site/component[col=$number and toShow='true']) > 0">

				<xsl:if test="nickname != 'full'">
					<xsl:text disable-output-escaping="yes"><![CDATA[<div class="container">]]></xsl:text>
				</xsl:if>

				<xsl:for-each select="site/component[col=$number and toShow='true']">
					<xsl:sort select="row" data-type="number"/>

					<xsl:if test="../../includeType = 'XML'">
						<xsl:value-of disable-output-escaping="yes" select="fileContent"/>
					</xsl:if>
					<xsl:if test="../../includeType = 'SSI'">
						<xsl:comment>#include file="<xsl:value-of select="fileInclude"/>"</xsl:comment>
					</xsl:if>
					<xsl:if test="../../includeType = 'PHP'">
						<xsl:text disable-output-escaping="yes">&#60;</xsl:text>?include("<xsl:value-of select="fileInclude"/>")?<xsl:text disable-output-escaping="yes">&#62;</xsl:text>
					</xsl:if>
				</xsl:for-each>

				<xsl:if test="nickname != 'full'">
					<xsl:text disable-output-escaping="yes"><![CDATA[</div>]]></xsl:text>
				</xsl:if>
			</xsl:if>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>