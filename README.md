# AI Email Assistant

A modern, AI-powered email assistant built with Next.js, featuring advanced attachment handling and smart reply capabilities.

## Features

- 📧 **Email Management**: View, compose, and manage emails with a clean interface
- 📎 **Advanced Attachments**: Drag-and-drop file uploads with preview and management
- 🤖 **AI-Powered Replies**: Generate smart email responses using AI
- ⭐ **Email Organization**: Star, label, and organize emails efficiently
- 🔍 **Smart Search**: Search through emails by content, sender, or subject
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **File Handling**: React Dropzone
- **Icons**: Lucide React

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/lkkl/ai-email-assistant.git
   cd ai-email-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build and Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main application page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── AttachmentUpload.tsx
│   ├── EmailComposer.tsx
│   ├── EmailList.tsx
│   └── EmailViewer.tsx
├── lib/               # Utility functions
│   └── utils.ts
└── types/             # TypeScript type definitions
    └── email.ts
```

## Key Components

### AttachmentUpload
- Drag-and-drop file upload interface
- File size and type validation
- Preview and management of uploaded files
- Support for multiple file formats

### EmailComposer
- Rich email composition interface
- AI-powered reply suggestions
- Attachment integration
- Draft saving functionality

### EmailViewer
- Clean email reading interface
- Attachment preview and download
- Reply, forward, and delete actions
- Email starring and labeling

## Features in Detail

### Attachment Handling
- **Drag & Drop**: Intuitive file upload experience
- **File Validation**: Size limits and type checking
- **Preview**: Visual file previews with icons
- **Management**: Easy removal and organization of attachments

### AI Integration
- **Smart Replies**: AI-generated response suggestions
- **Context Awareness**: Responses based on email content
- **Customizable**: Easily extendable AI functionality

### Email Management
- **Inbox Organization**: Star, label, and categorize emails
- **Search**: Full-text search across all email content
- **Filtering**: View starred, sent, and other email categories
- **Responsive**: Optimized for all screen sizes

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with Next.js recommended rules
- **Tailwind CSS**: Utility-first CSS framework
- **Component Architecture**: Modular, reusable components

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

This application can be deployed on various platforms:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

For Vercel deployment:
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected for Next.js)
3. Deploy with automatic CI/CD

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

Built with ❤️ using Next.js and modern web technologies.
