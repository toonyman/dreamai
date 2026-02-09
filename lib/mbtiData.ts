export interface ArthurianCharacter {
    id: string; // Used as translation key: mbti.char.{id}.name, etc.
    mbti: string;
    imagePrompt: string;
    traits: string[]; // These can also be keys if needed, but let's keep them as strings for now or keys
}

export const arthurianCharacters: Record<string, ArthurianCharacter> = {
    "INTJ": { id: "merlin", mbti: "INTJ", traits: ["Strategic", "Visionary", "Independent", "Profound"], imagePrompt: "Powerful wizard Merlin with long white beard and starry robes, holding a crystal staff, mystical forest background, ethereal lighting, high fantasy art style" },
    "ENTJ": { id: "arthur", mbti: "ENTJ", traits: ["Decisive", "Charismatic", "Authoritative", "Ambitious"], imagePrompt: "King Arthur in shining silver armor, wearing a golden crown, holding Excalibur high, Round Table hall background, heroic atmosphere, cinematic lighting" },
    "INFJ": { id: "lady_lake", mbti: "INFJ", traits: ["Intuitive", "Mystical", "Compassionate", "Insightful"], imagePrompt: "Lady of the Lake, ethereal woman emerging from a misty lake, holding a glowing sword, water lilies and moonbeams, dreamlike fantasy style" },
    "ENFJ": { id: "guinevere", mbti: "ENFJ", traits: ["Empathetic", "Inspiring", "Diplomatic", "Idealistic"], imagePrompt: "Queen Guinevere in a regal velvet gown, crown of wildflowers, in a lush castle garden, golden hour sunlight, elegant and warm atmosphere" },
    "INTP": { id: "morgan", mbti: "INTP", traits: ["Analytical", "Philosophical", "Independent", "Complex"], imagePrompt: "Morgan le Fay in dark purple robes, studying an ancient tome, glowing emerald magic in her hands, dark gothic library background" },
    "ENTP": { id: "kay", mbti: "ENTP", traits: ["Witty", "Resourceful", "Challenging", "Adaptable"], imagePrompt: "Sir Kay with a clever smirk, wearing practical traveling armor, leaning against a castle wall, sharp features, dynamic lighting" },
    "INFP": { id: "galahad", mbti: "INFP", traits: ["Idealistic", "Pure", "Deep", "Dedicated"], imagePrompt: "Sir Galahad in white armor, kneeling before the Holy Grail, divine light descending, cathedral background, spiritual and serene atmosphere" },
    "ENFP": { id: "gawain", mbti: "ENFP", traits: ["Passionate", "Adventurous", "Warm", "Enthusiastic"], imagePrompt: "Sir Gawain with a bright smile, riding a horse into a sun-drenched valley, golden armor reflecting the sun, vibrant colors" },
    "ISTJ": { id: "bedivere", mbti: "ISTJ", traits: ["Reliable", "Practical", "Traditional", "Honorable"], imagePrompt: "Sir Bedivere standing solemnly by a rocky shore, returning a sword to the lake, evening mist, steadfast and noble expression" },
    "ESTJ": { id: "mordred", mbti: "ESTJ", traits: ["Organized", "Driven", "Efficient", "Direct"], imagePrompt: "Sir Mordred in sharp, black and silver armor, pointing a map on a table, cold castle interior, stern and focused expression" },
    "ISFJ": { id: "lancelot", mbti: "ISFJ", traits: ["Protective", "Loyal", "Skilled", "Committed"], imagePrompt: "Sir Lancelot kneeling, shield with a white lion, sunset background, tragic yet heroic appearance, detailed armor" },
    "ESFJ": { id: "percival", mbti: "ESFJ", traits: ["Harmonious", "Supportive", "Loyal", "Traditional"], imagePrompt: "Sir Percival in simple but clean armor, helping a commoner near a village, friendly expression, bright and cheer surroundings" },
    "ISTP": { id: "bors", mbti: "ISTP", traits: ["Pragmatic", "Analytical", "Quiet", "Versatile"], imagePrompt: "Sir Bors sharpening a dagger by a small campfire, deep in a wild forest, rugged appearance, focused look, survivalist vibe" },
    "ESTP": { id: "tristan", mbti: "ESTP", traits: ["Bold", "Spontaneous", "Skillful", "Direct"], imagePrompt: "Sir Tristan with a harp on his back and a sword at his side, standing on a ship's deck, stormy sea, windswept hair, energetic pose" },
    "ISFP": { id: "gareth", mbti: "ISFP", traits: ["Gentle", "Artistic", "Kind", "Patient"], imagePrompt: "Sir Gareth without a helmet, showing a kind face, amidst a field of lavender, soft lighting, peaceful and authentic feel" },
    "ESFP": { id: "dinadan", mbti: "ESFP", traits: ["Witty", "Spontaneous", "Social", "Optimistic"], imagePrompt: "Sir Dinadan laughing heartily, surrounded by other knights in a tavern, joyful expression, warm golden lighting, lively atmosphere" }
};

export interface Question {
    id: string; // mbti.q{id}.text, mbti.q{id}.optA, mbti.q{id}.optB
    options: {
        type: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
    }[];
}

export const mbtiQuestions: Question[] = [
    { id: "1", options: [{ type: "E" }, { type: "I" }] },
    { id: "2", options: [{ type: "S" }, { type: "N" }] },
    { id: "3", options: [{ type: "T" }, { type: "F" }] },
    { id: "4", options: [{ type: "J" }, { type: "P" }] },
    { id: "5", options: [{ type: "E" }, { type: "I" }] },
    { id: "6", options: [{ type: "S" }, { type: "N" }] },
    { id: "7", options: [{ type: "T" }, { type: "F" }] },
    { id: "8", options: [{ type: "J" }, { type: "P" }] },
    { id: "9", options: [{ type: "E" }, { type: "I" }] },
    { id: "10", options: [{ type: "S" }, { type: "N" }] },
    { id: "11", options: [{ type: "T" }, { type: "F" }] },
    { id: "12", options: [{ type: "J" }, { type: "P" }] }
];
