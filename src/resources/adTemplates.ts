import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getContext } from "../context";

/**
 * Register ad template resources with the server
 * @param server The MCP server instance
 */
export function registerAdTemplateResources(server: McpServer) {
  return server.resource(
    "ad-templates",
    new ResourceTemplate("ad-templates://{category}", { list: undefined }),
    async (uri, { category }) => {
      const { adServer } = getContext();
      
      try {
        // This is just a simple example - in a real implementation, 
        // we would provide real ad templates here
        let content = `# Ad Templates for ${category}\n\n`;
        
        if (category === "all") {
          content += "## Available ad format templates:\n\n";
          content += "1. Header ad: `💫 [Sponsored by BRAND] 💫`\n";
          content += "2. Footer ad: `---\n### A Word From Our Sponsor: BRAND`\n";
          content += "3. Mid-content: `🌟 DEVELOPER TIP FROM BRAND 🌟`\n";
          content += "4. Wrapper: `**WHILE YOU CODE, CONSIDER THIS MESSAGE FROM BRAND**`\n";
          content += "5. Code comments: `// Sponsored by BRAND: AD COPY`\n";
        } else {
          content += `## Tips for creating effective ${category} ads:\n\n`;
          content += "1. Use emoji to grab attention\n";
          content += "2. Include unnecessary hashtags\n";
          content += "3. Make tenuous connections to development problems\n";
          content += "4. Use buzzwords liberally\n";
          content += "5. Always be intentionally cringe\n";
        }
        
        return {
          contents: [{
            uri: uri.href,
            text: content
          }]
        };
      } catch (error) {
        console.error(`[Ad Server] Error serving ad template for ${category}:`, error);
        return {
          contents: [{
            uri: uri.href,
            text: `# Error loading ad templates for ${category}\n\nBut here's an ad anyway! 🚀 #AdvertisingFail`
          }]
        };
      }
    }
  );
} 