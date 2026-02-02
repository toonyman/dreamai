import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            // Navigation
            "nav.home": "Home",
            "nav.history": "History",
            "nav.language": "Language",

            // Home Page
            "home.title": "Dream Interpretation",
            "home.subtitle": "Discover the hidden meanings in your dreams",
            "home.placeholder": "Describe your dream in detail...",
            "home.submit": "Interpret My Dream",
            "home.loading": "Analyzing your dream...",

            // Interpretation Page
            "interpretation.title": "Your Dream Analysis",
            "interpretation.summary": "Summary",
            "interpretation.deep": "Deep Interpretation",
            "interpretation.keywords": "Lucky Symbols & Keywords",
            "interpretation.share": "Share Result",
            "interpretation.download": "Download Card",
            "interpretation.save": "Save to History",

            // History Page
            "history.title": "Dream History",
            "history.empty": "No dreams saved yet",
            "history.signIn": "Sign in to save your dreams",
            "history.date": "Date",
            "history.dream": "Dream",

            // Common
            "common.error": "An error occurred. Please try again.",
            "common.success": "Success!",
        }
    },
    ko: {
        translation: {
            // Navigation
            "nav.home": "홈",
            "nav.history": "기록",
            "nav.language": "언어",

            // Home Page
            "home.title": "꿈 해몽",
            "home.subtitle": "당신의 꿈 속 숨겨진 의미를 발견하세요",
            "home.placeholder": "꿈을 자세히 설명해주세요...",
            "home.submit": "꿈 해몽하기",
            "home.loading": "꿈을 분석하고 있습니다...",

            // Interpretation Page
            "interpretation.title": "꿈 분석 결과",
            "interpretation.summary": "요약",
            "interpretation.deep": "심층 해석",
            "interpretation.keywords": "행운의 상징 & 키워드",
            "interpretation.share": "결과 공유",
            "interpretation.download": "카드 다운로드",
            "interpretation.save": "기록에 저장",

            // History Page
            "history.title": "꿈 기록",
            "history.empty": "아직 저장된 꿈이 없습니다",
            "history.signIn": "로그인하여 꿈을 저장하세요",
            "history.date": "날짜",
            "history.dream": "꿈",

            // Common
            "common.error": "오류가 발생했습니다. 다시 시도해주세요.",
            "common.success": "성공!",
        }
    },
    es: {
        translation: {
            // Navigation
            "nav.home": "Inicio",
            "nav.history": "Historial",
            "nav.language": "Idioma",

            // Home Page
            "home.title": "Interpretación de Sueños",
            "home.subtitle": "Descubre los significados ocultos en tus sueños",
            "home.placeholder": "Describe tu sueño en detalle...",
            "home.submit": "Interpretar Mi Sueño",
            "home.loading": "Analizando tu sueño...",

            // Interpretation Page
            "interpretation.title": "Análisis de Tu Sueño",
            "interpretation.summary": "Resumen",
            "interpretation.deep": "Interpretación Profunda",
            "interpretation.keywords": "Símbolos de Suerte y Palabras Clave",
            "interpretation.share": "Compartir Resultado",
            "interpretation.download": "Descargar Tarjeta",
            "interpretation.save": "Guardar en Historial",

            // History Page
            "history.title": "Historial de Sueños",
            "history.empty": "No hay sueños guardados aún",
            "history.signIn": "Inicia sesión para guardar tus sueños",
            "history.date": "Fecha",
            "history.dream": "Sueño",

            // Common
            "common.error": "Ocurrió un error. Por favor, inténtalo de nuevo.",
            "common.success": "¡Éxito!",
        }
    },
    ja: {
        translation: {
            // Navigation
            "nav.home": "ホーム",
            "nav.history": "履歴",
            "nav.language": "言語",

            // Home Page
            "home.title": "夢占い",
            "home.subtitle": "あなたの夢に隠された意味を発見しましょう",
            "home.placeholder": "夢を詳しく説明してください...",
            "home.submit": "夢を占う",
            "home.loading": "夢を分析しています...",

            // Interpretation Page
            "interpretation.title": "夢分析結果",
            "interpretation.summary": "要約",
            "interpretation.deep": "深層解釈",
            "interpretation.keywords": "幸運のシンボル＆キーワード",
            "interpretation.share": "結果を共有",
            "interpretation.download": "カードをダウンロード",
            "interpretation.save": "履歴に保存",

            // History Page
            "history.title": "夢の履歴",
            "history.empty": "まだ保存された夢はありません",
            "history.signIn": "ログインして夢を保存",
            "history.date": "日付",
            "history.dream": "夢",

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
