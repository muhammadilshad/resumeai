import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, sectionType, targetRole } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // If API key is not configured, return mock improved text
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Mock response for demo purposes
      const mockResponses: Record<string, string> = {
        summary: `Experienced professional with proven track record in ${targetRole || 'their field'}. Skilled in delivering results and driving innovation. Seeking to leverage expertise to contribute to a dynamic team.`,
        experience: `• Led initiatives resulting in measurable improvements and business growth\n• Collaborated with cross-functional teams to achieve project objectives\n• Demonstrated strong problem-solving and communication skills`,
        education: `Completed comprehensive education with focus on practical skills and theoretical knowledge relevant to ${targetRole || 'the industry'}.`,
      };

      const improved = mockResponses[sectionType] || `Enhanced version of: ${text}`;

      return NextResponse.json({
        original: text,
        improved,
        source: 'mock',
      });
    }

    // TODO: Integrate with OpenAI or Claude API
    // For now, return the mock response
    return NextResponse.json({
      original: text,
      improved: text,
      source: 'mock',
      message: 'AI integration coming soon. Configure OPENAI_API_KEY or ANTHROPIC_API_KEY to enable.',
    });
  } catch (error) {
    console.error('AI improvement error:', error);
    return NextResponse.json(
      { error: 'Failed to improve text' },
      { status: 500 }
    );
  }
}
