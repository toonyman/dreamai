# Dream Interpretation - AI-Powered Dream Analysis

A free, global AI-powered dream interpretation service built with Next.js and Google Gemini AI. Get instant psychological analysis of your dreams in multiple languages.

## 🌟 Features

- 🤖 **AI-Powered Analysis**: Advanced dream interpretation using Google Gemini 2.5 Flash Lite
- 🌍 **Multi-language Support**: English, Korean, Spanish, and Japanese
- 📱 **Responsive Design**: Beautiful, modern UI with glassmorphism effects
- 🚀 **Zero Cost**: Built with free tier services (Vercel, Gemini API)
- 🔍 **SEO Optimized**: Fully optimized for global search engine visibility
- ⚡ **Instant Results**: Get dream interpretations in seconds

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide React
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 2.5 Flash Lite API
- **Deployment**: Vercel
- **i18n**: i18next, react-i18next

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/toonyman/dreamai.git
   cd dreamai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Get your Gemini API key:
   - Visit [Google AI Studio](https://aistudio.google.com/apikey)
   - Create a new API key
   - Copy and paste it into `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variable:
   - `GEMINI_API_KEY`: Your Gemini API key
4. Deploy!

The app will be live at your Vercel URL.

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── interpret/
│   │       └── route.ts          # Dream interpretation API
│   ├── interpretation/
│   │   └── page.tsx              # Interpretation results page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Home page
│   └── sitemap.ts                # Dynamic sitemap
├── components/
│   └── Navigation.tsx            # Navigation component
├── lib/
│   ├── gemini.ts                 # Gemini AI integration
│   ├── i18n.ts                   # Internationalization
│   └── supabase.ts               # Utility functions
└── public/
    └── robots.txt                # SEO robots file
```

## 🌐 SEO Features

- **Comprehensive Meta Tags**: Open Graph, Twitter Cards
- **Structured Data**: JSON-LD for rich search results
- **Multi-language Support**: hreflang tags for international SEO
- **Dynamic Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Optimized for search engine crawling
- **Semantic HTML**: Proper heading structure and landmarks

## 🎨 Features Explained

### AI Dream Interpretation
Uses Google Gemini 2.5 Flash Lite to provide:
- Brief summary of dream themes
- Deep psychological interpretation
- Lucky keywords and symbols

### Multi-language Support
Seamless language switching with i18next:
- English (en)
- Korean (ko)
- Spanish (es)
- Japanese (ja)

### Global Accessibility
- Responsive design for all devices
- Fast loading times
- Accessible UI components
- SEO-optimized for worldwide reach

## 🔧 Configuration

### Environment Variables

```env
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional (for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Customization

- **Colors**: Edit `tailwind.config.ts` for theme colors
- **Languages**: Add more languages in `lib/i18n.ts`
- **SEO**: Update metadata in `app/layout.tsx`

## 📊 Performance

- **Lighthouse Score**: 95+ for SEO
- **Mobile-Friendly**: Fully responsive design
- **Fast Loading**: Optimized assets and code splitting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🙏 Acknowledgments

- Google Gemini AI for dream interpretation
- Next.js team for the amazing framework
- Vercel for hosting

---

Made with ✨ by DreamAI
