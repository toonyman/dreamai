export function extractKeywords(dreamDescription: string): string[] {
    // Simple keyword extraction - split by spaces and filter common words
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'was', 'were', 'is', 'are', 'i', 'my', 'me']);

    const words = dreamDescription
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word));

    return [...new Set(words)].slice(0, 5);
}
