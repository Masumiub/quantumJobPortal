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



# Backend API Documentation

## Base URL
```
https://quantum-job-portal-pi.vercel.app/api
```
or for local development:
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require JWT authentication. Include the session token in your requests (handled automatically by NextAuth.js).

### Authentication Flow
1. User logs in via `/api/auth/signin`
2. NextAuth.js manages JWT tokens automatically
3. Protected endpoints validate the session server-side
4. User-specific data is filtered by `userEmail` from the session

---

## API Endpoints

### Authentication Endpoints

#### GET/POST /api/auth/[...nextauth]
**Description**: NextAuth.js authentication handlers
**Authentication**: Public

```javascript
// Example login request
await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirect: false
});
```

### Jobs Endpoints

#### GET /api/jobs
**Description**: Get all jobs created by the authenticated user
**Authentication**: Required (JWT)
**Response**: `Array<Job>`

**Response Example**:
```json
[
  {
    "_id": "68b3c96eae597e0b356fc29f",
    "title": "Senior React Developer",
    "company": "TechCorp",
    "location": "Remote",
    "description": "We are looking for a skilled React developer...",
    "requirements": ["React", "Node.js", "TypeScript"],
    "salary": "$80,000 - $120,000",
    "level": "senior",
    "category": "development-it",
    "hiringCount": 2,
    "tags": ["React", "Frontend", "JavaScript"],
    "userId": "user123",
    "userEmail": "employer@example.com",
    "userName": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### POST /api/jobs
**Description**: Create a new job posting
**Authentication**: Required (JWT)
**Request Body**: `JobCreateRequest`

**Request Body Example**:
```json
{
  "title": "Full Stack Developer",
  "company": "Tech Innovations",
  "location": "San Francisco, CA",
  "description": "Join our team as a Full Stack Developer...",
  "requirements": ["React", "Node.js", "MongoDB", "Express"],
  "salary": "$90,000 - $130,000",
  "level": "mid",
  "category": "development-it",
  "hiringCount": 3,
  "tags": ["MERN", "JavaScript", "Fullstack"]
}
```

**Required Fields**: `title`, `company`, `location`, `level`, `hiringCount`

#### PUT /api/jobs/[id]
**Description**: Update a job posting
**Authentication**: Required (JWT)
**Permissions**: Only the job creator can update
**Request Body**: `JobUpdateRequest`

#### DELETE /api/jobs/[id]
**Description**: Delete a job posting
**Authentication**: Required (JWT)
**Permissions**: Only the job creator can delete

### Public Jobs Endpoints

#### GET /api/jobs/public
**Description**: Get all public job listings (for job seekers)
**Authentication**: Optional (provides enhanced features)
**Query Parameters**:
- `search` (optional): Search term for filtering jobs
- `category` (optional): Filter by category
- `level` (optional): Filter by experience level

**Example**: 
```
GET /api/jobs/public?search=react&category=development-it&level=senior
```

**Response**: `Array<PublicJob>`

### User Management Endpoints

#### POST /api/register
**Description**: Register a new user account
**Authentication**: Public
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### GET /api/user/profile
**Description**: Get current user profile
**Authentication**: Required (JWT)

#### PUT /api/user/profile
**Description**: Update user profile
**Authentication**: Required (JWT)

---

## Data Models

### Job Model
```typescript
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  category: string;
  hiringCount: number;
  tags: string[];
  userId: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Model
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: 'user' | 'employer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes
- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Rate Limiting

Currently implemented basic rate limiting:
- 100 requests per 15 minutes for authenticated users
- 50 requests per 15 minutes for unauthenticated users

---

## Security Features

1. **JWT Authentication**: All protected routes require valid JWT tokens
2. **Input Validation**: Server-side validation for all inputs
3. **CORS Protection**: Configured for approved origins only
4. **SQL Injection Prevention**: MongoDB with proper query sanitization
5. **XSS Protection**: Input sanitization and output encoding
6. **Rate Limiting**: Prevention of brute force attacks
7. **Environment Variables**: Sensitive data stored in environment variables

---

## Example Usage

### Creating a Job
```javascript
const createJob = async (jobData) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  return response.json();
};
```

### Searching Jobs
```javascript
const searchJobs = async (searchTerm) => {
  const response = await fetch(`/api/jobs/public?search=${encodeURIComponent(searchTerm)}`);
  
  if (!response.ok) {
    throw new Error('Failed to search jobs');
  }

  return response.json();
};
```

---

## Webhook Events (Future Implementation)

Planned webhook events for future versions:
- `job.created`: When a new job is posted
- `job.updated`: When a job is modified
- `job.deleted`: When a job is removed
- `application.submitted`: When a user applies to a job

---

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: 
   - Check if user is logged in
   - Verify session token is valid

2. **403 Forbidden**: 
   - User doesn't have permission to access the resource
   - Trying to modify another user's job

3. **400 Bad Request**:
   - Check required fields are provided
   - Validate input data types

### Debug Mode

Enable debug logging by setting:
```env
NEXTAUTH_DEBUG=true
```

---

## Support

For API-related issues:
1. Check this documentation first
2. Verify your authentication status
3. Ensure all required fields are provided
4. Check network tab for detailed error responses



---



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
- **Email**: musfiquemasum@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/Masumiub/quantumJobPortal/issues)

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- MongoDB for reliable database services
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons

---
