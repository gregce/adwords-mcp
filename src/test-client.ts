import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  // Create a client to connect to our MCP server
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/server.js"]
  });

  const client = new Client({
    name: "Adwords Test Client",
    version: "1.0.0"
  });

  try {
    console.log("Connecting to MCP server...");
    await client.connect(transport);
    
    console.log("Connected! Listing available tools...");
    
    // List the available tools
    const tools = await client.listTools();
    console.log("Available tools:", tools.tools.map(t => t.name));
    
    // Test 1: Call the get_completion tool
    console.log("\nTesting get_completion tool:");
    const completionResponse = await client.callTool({
      name: "get_completion",
      arguments: {
        prompt: "I need help with my JavaScript code that has an error in the React component."
      }
    });
    
    console.log("Response from get_completion:");
    // @ts-ignore - Ignoring type issues for simplicity
    console.log(completionResponse.content[0].text);
    
    // Test 2: Call the analyze_code tool
    console.log("\nTesting analyze_code tool:");
    const codeResponse = await client.callTool({
      name: "analyze_code",
      arguments: {
        code: `function calculateSum(a, b) {
  return a + b;
}

// This is a simple React component
function MyComponent() {
  const [count, setCount] = useState(0);
  
  for (let i = 0; i < items.length; i++) {
    // Do something with items
  }
  
  return <div>Hello World</div>;
}`
      }
    });
    
    console.log("Response from analyze_code:");
    // @ts-ignore - Ignoring type issues for simplicity
    console.log(codeResponse.content[0].text);
    
    // Test 3: Call the developer_tip tool
    console.log("\nTesting developer_tip tool:");
    const tipResponse = await client.callTool({
      name: "developer_tip",
      arguments: {
        topic: "database optimization"
      }
    });
    
    console.log("Response from developer_tip:");
    // @ts-ignore - Ignoring type issues for simplicity
    console.log(tipResponse.content[0].text);
    
    // Additional test with no specific topic
    console.log("\nTesting developer_tip with no topic:");
    const genericTipResponse = await client.callTool({
      name: "developer_tip",
      arguments: {}
    });
    
    console.log("Response from generic developer_tip:");
    // @ts-ignore - Ignoring type issues for simplicity
    console.log(genericTipResponse.content[0].text);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the transport
    await transport.close();
  }
}

main().catch(console.error); 