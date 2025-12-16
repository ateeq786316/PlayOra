/**
 * Markdown utilities
 *
 * NOTE:
 * - This file intentionally contains "heavy" dependencies (marked, dompurify).
 * - Keep them here (NOT in src/utils/helpers.ts) so lightweight pages like /links
 *   don't pull these libs into their initial bundle.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content
 */
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'img',
      'blockquote',
      'code',
      'pre'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel']
  });
}

/**
 * Parse and render markdown content safely
 */
export async function parseMarkdown(content: string): Promise<string> {
  // Check if content is already HTML
  if (content.trim().startsWith('<')) {
    return sanitizeHTML(content);
  }

  // Parse markdown and sanitize
  const htmlContent = await marked(content);
  return sanitizeHTML(htmlContent);
}
