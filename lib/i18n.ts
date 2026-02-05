import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            // Navigation
            "nav.home": "Home",
            "nav.language": "Language",

            // Home Page
            "home.title": "Dream Interpretation",
            "home.subtitle": "Discover the hidden meanings in your dreams",
            "home.placeholder": "Describe your dream in detail...",
            "home.submit": "Interpret My Dream",
            "home.loading": "Analyzing your dream...",

            // SEO
            "seo.title": "Free AI Dream Interpretation - Discover Your Dream Meanings",
            "seo.description": "Get instant AI-powered dream analysis and interpretation. Understand the psychological meaning behind your dreams with our free multilingual service.",

            // Interpretation Page
            "interpretation.title": "Your Dream Analysis",
            "interpretation.summary": "Summary",
            "interpretation.deep": "Deep Interpretation",
            "interpretation.keywords": "Lucky Symbols & Keywords",
            "interpretation.lucky_item": "Lucky Item",
            "interpretation.lucky_color": "Lucky Color",
            "interpretation.lucky_number": "Lucky Number",
            "interpretation.rarity_title": "Dream Rarity",
            "interpretation.share": "Share Result",
            "interpretation.analyze_another": "Analyze Another Dream",

            // Chat
            "chat.title": "Dream Oracle Chat",
            "chat.subtitle": "Ask deeper questions about your dream",
            "chat.placeholder": "Type your question here...",
            "chat.suggestion1": "Is this a good omen?",
            "chat.suggestion2": "What should I be careful about?",
            "chat.suggestion3": "Tell me more about the symbols.",
            "chat.empty_state": "The Oracle is listening. Ask anything about your dream.",

            // Modes
            "mode.general": "General",
            "mode.wealth": "Wealth & Luck",
            "mode.romance": "Romance",
            "mode.creative": "Creative",

            // About Section
            "home.about_title": "About DreamAI",
            "home.about_description": "DreamAI combines advanced artificial intelligence with psychological dream analysis principles to provide instant, detailed interpretations of your dreams. Whether you're curious about a nightmare, a recurring dream, or a strange symbol, our tool helps you uncover the hidden messages from your subconscious mind. Supports English, Korean, Spanish, and Japanese.",

            // Common
            "common.error": "An error occurred. Please try again.",
            "common.success": "Success!",
        }
    },
    ko: {
        translation: {
            // Navigation
            "nav.home": "홈",
            "nav.language": "언어",

            // Home Page
            "home.title": "꿈 해몽",
            "home.subtitle": "당신의 꿈 속 숨겨진 의미를 발견하세요",
            "home.placeholder": "꿈을 자세히 설명해주세요...",
            "home.submit": "꿈 해몽하기",
            "home.loading": "꿈을 분석하고 있습니다...",

            // About Section
            "home.about_title": "DreamAI 소개",
            "home.about_description": "DreamAI는 최신 인공지능 기술과 심리학적 꿈 분석 원리를 결합하여 꿈에 대한 즉각적이고 상세한 해몽을 제공합니다. 악몽, 반복되는 꿈, 혹은 기이한 상징에 대해 궁금하다면, 저희 도구가 무의식의 메시지를 발견하도록 도와드립니다. 한국어, 영어, 스페인어, 일본어를 지원합니다.",

            // SEO
            "seo.title": "무료 AI 꿈 해몽 - 꿈의 의미를 발견하세요",
            "seo.description": "AI 기반 꿈 분석과 해몽을 즉시 받아보세요. 무료 다국어 서비스로 꿈의 심리학적 의미를 이해하세요.",

            // Interpretation Page
            "interpretation.title": "꿈 분석 결과",
            "interpretation.summary": "요약",
            "interpretation.deep": "심층 해석",
            "interpretation.keywords": "행운의 상징 & 키워드",
            "interpretation.lucky_item": "행운의 아이템",
            "interpretation.lucky_color": "행운의 색상",
            "interpretation.lucky_number": "행운의 숫자",
            "interpretation.rarity_title": "꿈의 희귀도",
            "interpretation.share": "결과 공유",
            "interpretation.analyze_another": "또 다른 꿈 해몽하기",

            // Chat
            "chat.title": "꿈의 신탁 (Chat)",
            "chat.subtitle": "꿈에 대해 더 깊이 물어보세요",
            "chat.placeholder": "궁금한 점을 입력하세요...",
            "chat.suggestion1": "이 꿈은 길몽인가요?",
            "chat.suggestion2": "제가 조심해야 할 점은 무엇인가요?",
            "chat.suggestion3": "상징의 의미를 더 자세히 알려주세요.",
            "chat.empty_state": "신탁이 듣고 있습니다. 꿈에 대해 무엇이든 물어보세요.",

            // Modes
            "mode.general": "일반",
            "mode.wealth": "재물운",
            "mode.romance": "연애운",
            "mode.creative": "창의력",

            // Common
            "common.error": "오류가 발생했습니다. 다시 시도해주세요.",
            "common.success": "성공!",
        }
    },
    es: {
        translation: {
            // Navigation
            "nav.home": "Inicio",
            "nav.language": "Idioma",

            // Home Page
            "home.title": "Interpretación de Sueños",
            "home.subtitle": "Descubre los significados ocultos en tus sueños",
            "home.placeholder": "Describe tu sueño en detalle...",
            "home.submit": "Interpretar Mi Sueño",
            "home.loading": "Analizando tu sueño...",

            // About Section
            "home.about_title": "Sobre DreamAI",
            "home.about_description": "DreamAI combina inteligencia artificial avanzada con principios psicológicos de análisis de sueños para proporcionar interpretaciones instantáneas y detalladas. Ya sea una pesadilla, un sueño recurrente o un símbolo extraño, nuestra herramienta te ayuda a descubrir los mensajes ocultos de tu subconsciente. Soporta inglés, coreano, español y japonés.",

            // SEO
            "seo.title": "Interpretación de Sueños con IA Gratis - Descubre el Significado",
            "seo.description": "Obtén análisis e interpretación de sueños con IA al instante. Comprende el significado psicológico de tus sueños con nuestro servicio multilingüe gratuito.",

            // Interpretation Page
            "interpretation.title": "Análisis de Tu Sueño",
            "interpretation.summary": "Resumen",
            "interpretation.deep": "Interpretación Profunda",
            "interpretation.keywords": "Símbolos de Suerte y Palabras Clave",
            "interpretation.lucky_item": "Objeto de la Suerte",
            "interpretation.lucky_color": "Color de la Suerte",
            "interpretation.lucky_number": "Número de la Suerte",
            "interpretation.rarity_title": "Rareza del Sueño",
            "interpretation.share": "Compartir Resultado",
            "interpretation.analyze_another": "Analizar Otro Sueño",

            // Chat
            "chat.title": "Oráculo de Sueños",
            "chat.subtitle": "Haz preguntas más profundas sobre tu sueño",
            "chat.placeholder": "Escribe tu pregunta aquí...",
            "chat.suggestion1": "¿Es esto un buen presagio?",
            "chat.suggestion2": "¿De qué debo tener cuidado?",
            "chat.suggestion3": "Cuéntame más sobre los símbolos.",
            "chat.empty_state": "El Oráculo está escuchando. Pregunta cualquier cosa.",

            // Modes
            "mode.general": "General",
            "mode.wealth": "Riqueza",
            "mode.romance": "Amor",
            "mode.creative": "Creatividad",

            // Common
            "common.error": "Ocurrió un error. Por favor, inténtalo de nuevo.",
            "common.success": "¡Éxito!",
        }
    },
    ja: {
        translation: {
            // Navigation
            "nav.home": "ホーム",
            "nav.language": "言語",

            // Home Page
            "home.title": "夢占い",
            "home.subtitle": "あなたの夢に隠された意味を発見しましょう",
            "home.placeholder": "夢を詳しく説明してください...",
            "home.submit": "夢を占う",
            "home.loading": "夢を分析しています...",

            // About Section
            "home.about_title": "DreamAIについて",
            "home.about_description": "DreamAIは、高度な人工知能と心理学的な夢分析の原則を組み合わせて、あなたの夢の即時かつ詳細な解釈を提供します。悪夢、繰り返される夢、または奇妙なシンボルについて知りたい場合でも、私たちのツールが潜在意識からの隠されたメッセージを発見するお手伝いをします。英語、韓国語、スペイン語、日本語に対応しています。",

            // SEO
            "seo.title": "無料AI夢占い - 夢の意味を発見",
            "seo.description": "AIによる夢分析と解釈を即座に取得。無料の多言語サービスで夢の心理的意味を理解しましょう。",

            // Interpretation Page
            "interpretation.title": "夢分析結果",
            "interpretation.summary": "要約",
            "interpretation.deep": "深層解釈",
            "interpretation.keywords": "幸運のシンボル＆キーワード",
            "interpretation.lucky_item": "ラッキーアイテム",
            "interpretation.lucky_color": "ラッキーカラー",
            "interpretation.lucky_number": "ラッキーナンバー",
            "interpretation.rarity_title": "夢のレア度",
            "interpretation.share": "結果を共有",
            "interpretation.analyze_another": "別の夢を占う",

            // Chat
            "chat.title": "夢の託宣 (Chat)",
            "chat.subtitle": "夢についてもっと深く聞いてみましょう",
            "chat.placeholder": "ここに質問を入力してください...",
            "chat.suggestion1": "これは吉夢ですか？",
            "chat.suggestion2": "何に気をつけるべきですか？",
            "chat.suggestion3": "シンボルについてもっと教えてください。",
            "chat.empty_state": "託宣が聞いています。夢について何でも聞いてください。",

            // Modes
            "mode.general": "一般",
            "mode.wealth": "金運",
            "mode.romance": "恋愛運",
            "mode.creative": "創造性",

            // Common
            "common.error": "エラーが発生しました。もう一度お試しください。",
            "common.success": "成功！",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
