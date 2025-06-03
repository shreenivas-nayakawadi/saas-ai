# AI SaaS Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Project-blue)](https://saas-ai-eta-teal.vercel.app/)

A modern AI-powered SaaS platform built with Next.js 15, featuring multiple AI tools including code generation, conversation, and more.

## Screenshots

### Landing Page
![Landing Page](./screenshots/landing%20page.png)

### Dashboard
![Dashboard](./screenshots/dashboard%20page.png)

### Code Generation
![Code Generation](./screenshots/code%20generation%20page.png)

### AI Conversation
![AI Conversation](./screenshots/converstion%20page.png)

### Authentication
![Authentication](./screenshots/clerk%20authentication.png)

## Features

- 🤖 Multiple AI Tools
  - Code Generation
  - AI Conversation
  - More tools coming soon...
- 🔐 Secure Authentication with Clerk
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully Responsive Design
- 🚀 Built with Next.js 15
- 🎯 TypeScript for Type Safety
- 🗄️ MongoDB Database with Prisma ORM

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** MongoDB
- **ORM:** Prisma
- **AI Integration:** Google AI
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form + Zod

## Prerequisites

Before you begin, ensure you have the following:
- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Google AI API key
- Clerk account for authentication

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_mongodb_connection_string"

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# AI
GOOGLE_API_KEY="your_google_ai_api_key"
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-saas.git
cd ai-saas
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
ai-saas/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # React components
├── lib/                 # Utility functions
├── prisma/             # Database schema and migrations
└── public/             # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Google AI](https://ai.google)
