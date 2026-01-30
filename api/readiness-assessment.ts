/**
 * POST /api/readiness-assessment
 * Body: { answers: { "photo-id": true|false, "proof-income": true|false, ... } }
 *
 * Returns a dynamic assessment (label, summary, gaps, nextSteps, encouragement).
 * Set OPENAI_API_KEY in Vercel env for AI-powered responses; otherwise uses rule-based fallback.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Response shape for the frontend (AI or fallback). */
export type ReadinessAssessmentResponse = {
  label: string;
  summary: string;
  gaps: string[];
  nextSteps: string[];
  encouragement?: string;
  fromAI: boolean;
};

const QUESTIONS: Record<string, string> = {
  'photo-id': 'Do you have valid photo ID?',
  'proof-income': 'Can you show recent proof of income?',
  'rented-before': 'Have you rented before in the UK?',
  guarantor: 'Would you be able to provide a guarantor if asked?',
};

function fallbackAssessment(answers: Record<string, boolean | null>): ReadinessAssessmentResponse {
  const entries = Object.entries(answers).filter(([, v]) => v !== null) as [string, boolean][];
  const yesCount = entries.filter(([, v]) => v).length;
  const total = entries.length;
  const percentage = total ? (yesCount / total) * 100 : 0;

  let label: string;
  let gaps: string[] = [];
  let nextSteps: string[] = [];

  if (percentage >= 75) {
    label = 'Mostly Ready';
    nextSteps = [
      'Gather your documents (photo ID, proof of income) before you apply.',
      'When applying, have your references or previous landlord details ready.',
    ];
  } else if (percentage >= 50) {
    label = 'A Few Gaps';
    if (!answers['photo-id']) {
      gaps.push('Valid photo ID (passport or driving licence)');
      nextSteps.push('Get or renew your passport or driving licence.');
    }
    if (!answers['proof-income']) {
      gaps.push('Recent proof of income');
      nextSteps.push('Collect recent payslips or employment contract; self-employed applicants may need accounts or tax documents.');
    }
    if (!answers['rented-before']) nextSteps.push('Prepare a character or employer reference if you haven’t rented in the UK before.');
    if (!answers.guarantor) nextSteps.push('Identify someone who could act as a guarantor if the agent requires one.');
  } else {
    label = 'Needs Preparation';
    if (!answers['photo-id']) gaps.push('Valid photo ID');
    if (!answers['proof-income']) gaps.push('Proof of income');
    if (!answers['rented-before']) gaps.push('Reference or explanation (no UK rental history)');
    if (!answers.guarantor) gaps.push('Potential guarantor');
    nextSteps = [
      'Start with photo ID and proof of income — these are asked for most applications.',
      'If you can’t provide a guarantor yet, look for agents or landlords who use alternative schemes.',
      'Use our downloadable checklist to prepare documents before applying.',
    ];
  }

  const summary =
    'This assessment helps you prepare for what UK letting agents typically check. It doesn’t decide your application outcome.';

  return {
    label,
    summary,
    gaps,
    nextSteps,
    encouragement:
      percentage >= 75
        ? 'You’re in good shape. Double-check the checklist and you’re ready to apply.'
        : percentage >= 50
          ? 'A few small steps will strengthen your application.'
          : 'Taking time to prepare now will make applications smoother.',
    fromAI: false,
  };
}

function buildPrompt(answers: Record<string, boolean | null>): string {
  const lines = Object.entries(answers)
    .filter(([, v]) => v !== null)
    .map(([id, value]) => `- ${QUESTIONS[id] ?? id}: ${value ? 'Yes' : 'No'}`);
  return lines.join('\n');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<VercelResponse> {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answers } = req.body as { answers?: Record<string, boolean | null> };
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Missing or invalid answers' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const fallback = fallbackAssessment(answers);
      return res.status(200).json(fallback);
    }

    const userPrompt = buildPrompt(answers);
    const systemPrompt = `You are a helpful UK rental application adviser. Based on the user's yes/no answers to standard readiness questions, return a short, practical assessment in JSON only (no markdown, no code block). Be specific to their answers and UK lettings.

Return exactly this JSON structure (no other text):
{
  "label": "One of: Mostly Ready | A Few Gaps | Needs Preparation",
  "summary": "1-2 sentences: what this means for them, in plain English.",
  "gaps": ["list of what they're missing or weak on, short phrases"],
  "nextSteps": ["2-4 concrete, actionable steps they can take next"],
  "encouragement": "One short encouraging sentence."
}

Keep each list item brief. Be supportive and accurate for UK rental applications.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI API error:', response.status, err);
      const fallback = fallbackAssessment(answers);
      return res.status(200).json(fallback);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      const fallback = fallbackAssessment(answers);
      return res.status(200).json(fallback);
    }

    // Strip optional markdown code fence if present
    const raw = content.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
    let parsed: ReadinessAssessmentResponse;
    try {
      parsed = JSON.parse(raw) as ReadinessAssessmentResponse;
    } catch {
      const fallback = fallbackAssessment(answers);
      return res.status(200).json(fallback);
    }

    const result: ReadinessAssessmentResponse = {
      label: parsed.label ?? fallbackAssessment(answers).label,
      summary: parsed.summary ?? '',
      gaps: Array.isArray(parsed.gaps) ? parsed.gaps : [],
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
      encouragement: parsed.encouragement,
      fromAI: true,
    };

    return res.status(200).json(result);
  } catch (error: unknown) {
    console.error('readiness-assessment error:', error);
    const answers = (req.body as { answers?: Record<string, boolean | null> })?.answers ?? {};
    const fallback = fallbackAssessment(answers);
    return res.status(200).json(fallback);
  }
}
