# 🌟 CivicScope

**AI-Powered Civic Issue Reporting Platform**

Transform your community with intelligent civic reporting. Capture, analyze, and report municipal issues with the power of artificial intelligence.

![CivicScope Banner](https://img.shields.io/badge/CivicScope-AI%20Powered-blueviolet?style=for-the-badge&logo=react)

---

## ✨ Features

### 🔥 **Core Functionality**
- **📸 Smart Image Capture** - Take photos or upload images of civic issues
- **🤖 AI-Powered Analysis** - Automatic issue description using Google Gemini AI
- **📍 GPS Location Tracking** - Precise location detection and mapping
- **📧 Auto Email Generation** - Professional complaint emails ready to send
- **📱 Device Integration** - Direct integration with device email apps

### 🎨 **Modern UI/UX**
- **Dark Mode Design** - Sleek glassmorphism interface
- **Gradient Animations** - Smooth, modern visual effects
- **Responsive Layout** - Perfect on mobile and desktop
- **Real-time Feedback** - Loading states and micro-interactions
- **Professional Branding** - Consistent CivicScope identity

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Google Gemini API Key
- Modern web browser with camera access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/civicscope.git
   cd civicscope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Google Gemini API key to `.env.local`:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🔧 Configuration

### Getting a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project or select existing one
3. Generate an API key
4. Add it to your `.env.local` file

### Email Configuration
The app is currently configured to send reports to:
- **Recipient:** `nagarayuktmathura@gmail.com`
- **Subject:** "Civic Issue Report - Immediate Attention Required"

To change the recipient email, update the `sendEmail` function in `app/report/page.tsx`.

---

## 🛠️ Tech Stack

### **Frontend**
- ![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) - React framework
- ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) - Type safety
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?logo=tailwind-css) - Styling

### **APIs & Services**
- ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?logo=google) - Image analysis
- ![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-Geocoding-7EBC6F?logo=openstreetmap) - Location services
- ![Google Maps](https://img.shields.io/badge/Google%20Maps-Embed-4285F4?logo=google-maps) - Map display

### **Features**
- Responsive design
- Real-time geolocation
- File upload & camera capture
- Email integration
- Progressive Web App ready

---

## 📱 How It Works

### **1. Capture Evidence**
Users can take photos directly through their device camera or upload existing images of civic issues like potholes, broken streetlights, or waste management problems.

### **2. AI Analysis** 
Google Gemini AI automatically analyzes the uploaded image and generates a professional description suitable for municipal authorities.

### **3. Location Detection**
The app automatically detects the user's GPS coordinates and converts them to a readable address using OpenStreetMap's reverse geocoding service.

### **4. Email Generation**
A complete email complaint is auto-generated with:
- AI-generated issue description
- Precise location information
- Professional formatting
- Pre-filled recipient (municipal authority)

### **5. Direct Reporting**
Users can send the report directly through their device's email app with one tap.

---

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy automatically!

### **Other Platforms**
- **Netlify** - Great for static deployment
- **Railway** - Full-stack hosting
- **DigitalOcean** - Professional hosting

### **Environment Variables for Production**
Make sure to add these in your hosting platform:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_production_api_key
```

---

## 📂 Project Structure

```
civicscope/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── report/
│   │   └── page.tsx        # Report creation page
│   └── globals.css         # Global styles
├── public/
│   └── fav1.png           # Custom favicon
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS config
└── README.md              # This file
```

---


### **Areas for Improvement**
- [ ] Multi-language support
- [ ] Issue categorization
- [ ] User authentication
- [ ] Report tracking dashboard
- [ ] Offline functionality
- [ ] Push notifications
- [ ] Social sharing features

---

## 🐛 Known Issues

- **Email attachments:** The `mailto:` protocol has limitations with image attachments. For production use, consider implementing a backend email service.
- **Browser compatibility:** Camera capture requires HTTPS in production environments.
- **Geolocation:** Requires user permission and HTTPS for production.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent image analysis
- **OpenStreetMap** for geocoding services
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for beautiful styling utilities


<div align="center">

**Made with ❤️ for better communities**


</div>
