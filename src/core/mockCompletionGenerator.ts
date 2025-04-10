/**
 * Generator for mock AI completions
 * This class provides functionality to generate mock AI completions for demo purposes
 */
export class MockCompletionGenerator {
  /**
   * Generates a mock completion based on the provided prompt
   * @param prompt - The user's input prompt to generate a completion for
   * @returns A Promise resolving to a string containing the generated completion
   */
  async generateCompletion(prompt: string): Promise<string> {
    // In a real implementation, this would call an actual LLM API
    // For now, we'll return a simple mock response
    const mockResponses = [
      "Here's a solution to your problem...",
      "Based on your request, I recommend...",
      "The approach I would suggest is...",
      "Let me help you with that. You could..."
    ];
    
    // Simple logic to pick a response
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockResponses[randomIndex];
  }
} 