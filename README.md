# Quantum Job Portal

A modern, full-stack job portal built with Next.js that connects job seekers with employers. Features advanced authentication, real-time job management, and a sleek user interface.

## Live Demo

🌐 **Live Website**: [https://quantum-job-portal-pi.vercel.app/](https://quantum-job-portal-pi.vercel.app/)

## Demo Credentials

- **Email**: musfiquemasum@gmail.com
- **Password**: admin1234

## Top Features

### 🔐 Authentication & Security
- **Google OAuth 2.0** integration for seamless login
- **JWT-based authentication** with secure session management
- **Role-based access control** (User/Admin)
- **Protected routes** and API endpoints
- **Password hashing** with bcrypt

### ⚡ Performance & SEO
- **Next.js 14** with App Router for optimal performance
- **Server-Side Rendering (SSR)** for faster initial loads
- **Incremental Static Regeneration (ISR)** for dynamic content
- **Comprehensive SEO metadata** and Open Graph tags
- **Structured data** (Schema.org) for better search visibility

### 🎨 User Experience
- **Modern, responsive design** with Tailwind CSS
- **Dark mode** with green accent theme
- **Real-time job search** with instant filtering
- **Interactive job management dashboard**
- **Smooth animations** and transitions

### 📊 Dashboard Features
- **Job creation and management** for employers
- **Application tracking system**
- **Real-time statistics** and analytics
- **User profile management**
- **Quick action buttons** for common tasks

### 📄 Pages & Functionality
- **Homepage** with hero section and featured jobs
- **Job listings** with advanced search and filtering
- **Job details** pages with comprehensive information
- **User dashboard** for job management
- **Contact form** with validation
- **Authentication pages** (Login/Register)

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **SweetAlert2** - Beautiful alerts and modals

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication library
- **JWT** - JSON Web Tokens for authentication

### Authentication
- **NextAuth.js** with credentials and Google provider
- **JWT tokens** for session management
- **bcrypt** for password hashing

### Deployment
- **Vercel** - Platform for Next.js applications
- **MongoDB Atlas** - Cloud database service

## Packages Used

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next-auth": "^4.24.5",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.3",
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "lucide-react": "^0.294.0",
    "sweetalert2": "^11.10.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- MongoDB Atlas account or local MongoDB installation
- Google OAuth credentials (for Google login)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Masumiub/quantumJobPortal.git
   cd quantumJobPortal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

## Future Improvements

### 🚀 Planned Features
- **Real-time notifications** for new job matches
- **Advanced job search filters** (salary range, experience level)
- **Company profiles** and employer branding pages
- **Job application tracking system**
- **Resume upload** and parsing functionality
- **Email notifications** for job alerts
- **Mobile app** with React Native

### 🔧 Technical Enhancements
- **Redis caching** for improved performance
- **GraphQL API** for more efficient data fetching
- **Docker containerization** for easier deployment
- **Unit and integration tests** with Jest
- **End-to-end testing** with Cypress
- **Performance monitoring** with Vercel Analytics
- **Internationalization** (i18n) for multiple languages

### 📈 Scaling Improvements
- **CDN integration** for static assets
- **Database optimization** with indexing
- **Load balancing** for high traffic
- **Microservices architecture** for better scalability
- **API rate limiting** and security enhancements

## Contributing

We welcome contributions! Please feel free to submit pull requests or open issues for bugs and feature requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please contact:
- **Email**: support@quantumjobportal.com
- **GitHub Issues**: [Create an issue](https://github.com/Masumiub/quantumJobPortal/issues)

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- MongoDB for reliable database services
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons

---

**Note**: This is a demo project. For production use, please ensure proper security measures, input validation, and error handling are implemented.