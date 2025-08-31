
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function ReportPage() {
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [location, setLocation] = useState<string>("");
//   const [mapUrl, setMapUrl] = useState<string>("");
//   const [analysis, setAnalysis] = useState<string>("");
//   const [emailBody, setEmailBody] = useState<string>("");
//   const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

//   // Handle image selection/capture
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Get user location
//   const fetchLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         // Reverse geocoding via OpenStreetMap Nominatim API
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//         );
//         const data = await res.json();
//         setLocation(data.display_name);
//         setMapUrl(
//           `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`
//         );
//       });
//     } else {
//       alert("Geolocation not supported in this browser");
//     }
//   };

//   // Call Gemini API to analyze image
//   const analyzeImage = async () => {
//     if (!image) {
//       alert("Please upload/capture an image first");
//       return;
//     }

//     setIsAnalyzing(true); // Start analyzing state

//     const reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onloadend = async () => {
//       const base64Image = reader.result as string;

//       try {
//         const res = await fetch(
//           "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
//             process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               contents: [
//                 {
//                   parts: [
//                     { text: "Describe this image and what is the issue in 50 words. Don't use bold or any type of asterisks. It should be like a complaining letter/email to the municipal authority." },
//                     {
//                       inline_data: {
//                         mime_type: image.type,
//                         data: base64Image.split(",")[1],
//                       },
//                     },
//                   ],
//                 },
//               ],
//             }),
//           }
//         );

//         const data = await res.json();
//         const description =
//           data.candidates?.[0]?.content?.parts?.[0]?.text ||
//           "No description generated.";
//         setAnalysis(description);

//         // Generate email body with cleaned location
//         const cleanLocation = location.replace(/\[.*?\]/g, '').trim();
//         setEmailBody(
//           `${description}\n\nLocation: ${cleanLocation}\n\nRegards,\nCitizen Reporter`
//         );
//       } catch (err) {
//         console.error(err);
//         alert("Error analyzing image");
//       } finally {
//         setIsAnalyzing(false); // End analyzing state
//       }
//     };
//   };

//   // Send email using device's email app
//   const sendEmail = () => {
//     if (!emailBody || !image) {
//       alert("Please analyze the image first to generate the email content");
//       return;
//     }

//     // Convert image to base64 for email attachment
//     const reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onloadend = () => {
//       const base64Image = reader.result as string;
      
//       // Clean the location by removing [street name] or similar brackets
//       const cleanLocation = location.replace(/\[.*?\]/g, '').trim();
      
//       // Create email parameters
//       const subject = encodeURIComponent("Civic Issue Report - Immediate Attention Required");
//       const cleanEmailBody = emailBody.replace(/\[.*?\]/g, '').trim();
//       const body = encodeURIComponent(
//         `${cleanEmailBody}\n\n--- Image attached below ---\n\nPlease find the image of the reported issue attached. This requires immediate attention from the municipal authority.\n\nThank you for your prompt response.`
//       );
      
//       // Create mailto link with specific recipient
//       const mailtoLink = `mailto:nagarayuktmathura@gmail.com?subject=${subject}&body=${body}`;
      
//       // Open device's default email app
//       window.location.href = mailtoLink;
      
//       // Note: Actual image attachment via mailto is not supported by most email clients
//       // For a production app, you'd need to use a backend service to send emails with attachments
//       // Or integrate with specific email service APIs
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
//       {/* Animated background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -inset-10 opacity-20">
//           <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
//           <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
//           <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
//         </div>
//       </div>

//       <div className="relative z-10 max-w-md mx-auto space-y-6">
//         {/* Header with Back Button */}
//         <div className="flex items-center justify-between py-6">
//           <Link href="/">
//             <button className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
//               <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               <span className="font-medium">Back</span>
//             </button>
//           </Link>
//           <div className="text-center">
//             <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               CivicScope
//             </h1>
//             <p className="text-slate-400 text-sm">Report Builder</p>
//           </div>
//           <div className="w-16"></div> {/* Spacer for centering */}
//         </div>

//         {/* Upload Section */}
//         <div className="group relative">
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//           <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-white font-semibold text-lg">Capture Evidence</h2>
//                 <p className="text-slate-400 text-sm">Take or upload a photo</p>
//               </div>
//             </div>
            
//             <label className="relative block w-full cursor-pointer group/upload">
//               <input
//                 type="file"
//                 accept="image/*"
//                 capture="environment"
//                 onChange={handleImageChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               {!preview ? (
//                 <div className="border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center hover:border-cyan-500 transition-all duration-300 hover:bg-slate-700/30 group-hover/upload:scale-105">
//                   <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/upload:bg-cyan-500/20 transition-colors">
//                     <svg className="w-8 h-8 text-slate-400 group-hover/upload:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   </div>
//                   <p className="text-slate-300 font-medium mb-1">Tap to capture or upload</p>
//                   <p className="text-slate-500 text-sm">Take a photo of the civic issue</p>
//                 </div>
//               ) : (
//                 <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover/upload:scale-105 transition-transform">
//                   <Image
//                     src={preview}
//                     alt="Preview"
//                     width={400}
//                     height={300}
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
//                   <div className="absolute bottom-4 left-4 right-4">
//                     <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
//                       <p className="text-white text-sm font-medium">✓ Image captured</p>
//                     </div>
//                   </div>
//                   <div className="absolute top-4 right-4">
//                     <div className="bg-cyan-500 rounded-full p-2">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </label>
//           </div>
//         </div>

//         {/* Location Section */}
//         <div className="group relative">
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//           <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-white font-semibold text-lg">Location Data</h2>
//                 <p className="text-slate-400 text-sm">Pinpoint the issue location</p>
//               </div>
//             </div>

//             <button
//               onClick={fetchLocation}
//               className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
//             >
//               <span className="flex items-center justify-center gap-3">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                 </svg>
//                 Get Current Location
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//               </span>
//             </button>

//             {location && (
//               <div className="mt-6 space-y-4">
//                 <div className="bg-slate-700/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/50">
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
//                       <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
//                         <circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     </div>
//                     <p className="text-slate-400 text-sm font-medium">Current Location</p>
//                   </div>
//                   <p className="text-white text-sm leading-relaxed">{location}</p>
//                 </div>
//                 {mapUrl && (
//                   <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-600/30">
//                     <iframe
//                       src={mapUrl}
//                       width="100%"
//                       height="200"
//                       className="rounded-2xl"
//                       loading="lazy"
//                     ></iframe>
//                     <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/20 to-transparent"></div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Analyze Button */}
//         <div className="group relative">
//           <div className={`absolute -inset-1 rounded-3xl blur transition duration-1000 ${
//             isAnalyzing 
//               ? "bg-slate-600 opacity-50" 
//               : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 animate-pulse"
//           }`}></div>
//           <button
//             onClick={analyzeImage}
//             disabled={isAnalyzing}
//             className={`relative w-full py-6 px-8 font-bold text-xl rounded-3xl transition-all duration-300 transform shadow-2xl ${
//               isAnalyzing
//                 ? "bg-slate-700 text-slate-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-cyan-500/25"
//             }`}
//           >
//             {isAnalyzing ? (
//               <span className="flex items-center justify-center gap-4">
//                 <svg className="animate-spin w-7 h-7" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>Analyzing with AI...</span>
//                 <div className="flex gap-1">
//                   <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-100"></div>
//                   <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
//                 </div>
//               </span>
//             ) : (
//               <span className="flex items-center justify-center gap-3">
//                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//                 Analyze with AI
//                 <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Analysis Result */}
//         {analysis && (
//           <div className="group relative animate-in slide-in-from-bottom-4 duration-500">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-white font-semibold text-lg">AI Analysis</h2>
//                   <p className="text-slate-400 text-sm">Issue description generated</p>
//                 </div>
//               </div>
//               <div className="bg-slate-700/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-600/50">
//                 <p className="text-slate-200 leading-relaxed font-medium">{analysis}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Email Section */}
//         {emailBody && (
//           <div className="group relative animate-in slide-in-from-bottom-4 duration-700">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-white font-semibold text-lg">Email Draft</h2>
//                   <p className="text-slate-400 text-sm">Ready to send report</p>
//                 </div>
//               </div>
              
//               <div className="space-y-6">
//                 <div className="bg-slate-700/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-600/50">
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
//                     <p className="text-slate-400 text-xs font-medium">TO: nagarayuktmathura@gmail.com</p>
//                   </div>
//                   <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">{emailBody}</pre>
//                 </div>

//                 {preview && (
//                   <div className="bg-slate-700/40 rounded-2xl p-4 border border-slate-600/30">
//                     <div className="flex items-center gap-2 mb-3">
//                       <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                       </svg>
//                       <p className="text-slate-400 text-sm font-medium">Attached Evidence</p>
//                     </div>
//                     <div className="relative overflow-hidden rounded-xl">
//                       <Image
//                         src={preview}
//                         alt="Email attachment preview"
//                         width={200}
//                         height={150}
//                         className="w-full h-28 object-cover"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={sendEmail}
//                   className="w-full py-5 px-6 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
//                 >
//                   <span className="flex items-center justify-center gap-3">
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                     </svg>
//                     Send Report Now
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </span>
//                 </button>
                
//                 <div className="text-center">
//                   <p className="text-slate-500 text-xs">
//                     Opens your email app with pre-filled complaint
//                   </p>
//                   <div className="flex items-center justify-center gap-1 mt-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <p className="text-slate-400 text-xs">Secure & Private</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ReportPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Handle image selection/capture
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Get user location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Reverse geocoding via OpenStreetMap Nominatim API
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        setLocation(data.display_name);
        setMapUrl(
          `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`
        );
      });
    } else {
      alert("Geolocation not supported in this browser");
    }
  };

  // Call Gemini API to analyze image
  const analyzeImage = async () => {
    if (!image) {
      alert("Please upload/capture an image first");
      return;
    }

    setIsAnalyzing(true); // Start analyzing state

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      try {
        const res = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
            process.env.NEXT_PUBLIC_GEMINI_API_KEY,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: "Describe this image and what is the issue in 50 words. Don't use bold or any type of asterisks. It should be like a complaining letter/email to the municipal authority." },
                    {
                      inline_data: {
                        mime_type: image.type,
                        data: base64Image.split(",")[1],
                      },
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await res.json();
        const description =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No description generated.";
        setAnalysis(description);

        // Clean the analysis description and location
        const cleanDescription = description.replace(/\[.*?\]/g, '').trim();
        const cleanLocation = location.replace(/\[.*?\]/g, '').trim();
        
        // Set cleaned analysis
        setAnalysis(cleanDescription);
        
        // Generate email body with cleaned data
        setEmailBody(
          `${cleanDescription}\n\nLocation: ${cleanLocation}\n\nRegards,\nCitizen Reporter`
        );
      } catch (err) {
        console.error(err);
        alert("Error analyzing image");
      } finally {
        setIsAnalyzing(false); // End analyzing state
      }
    };
  };

  // Send email using device's email app
  const sendEmail = () => {
    if (!emailBody || !image) {
      alert("Please analyze the image first to generate the email content");
      return;
    }

    // Convert image to base64 for email attachment
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      
      // Clean the location by removing [street name] or similar brackets
      const cleanLocation = location.replace(/\[.*?\]/g, '').trim();
      
      // Create email parameters
      const subject = encodeURIComponent("Civic Issue Report - Immediate Attention Required");
      const cleanEmailBody = emailBody.replace(/\[.*?\]/g, '').trim();
      const body = encodeURIComponent(
        `${cleanEmailBody}\n\n--- Image attached below ---\n\nPlease find the image of the reported issue attached. This requires immediate attention from the municipal authority.\n\nThank you for your prompt response.`
      );
      
      // Create mailto link with specific recipient
      const mailtoLink = `mailto:nagarayuktmathura@gmail.com?subject=${subject}&body=${body}`;
      
      // Open device's default email app
      window.location.href = mailtoLink;
      
      // Note: Actual image attachment via mailto is not supported by most email clients
      // For a production app, you'd need to use a backend service to send emails with attachments
      // Or integrate with specific email service APIs
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between py-6">
          <Link href="/">
            <button className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back</span>
            </button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CivicScope
            </h1>
            <p className="text-slate-400 text-sm">Report Builder</p>
          </div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>

        {/* Upload Section */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Capture Evidence</h2>
                <p className="text-slate-400 text-sm">Take or upload a photo</p>
              </div>
            </div>
            
            <label className="relative block w-full cursor-pointer group/upload">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {!preview ? (
                <div className="border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center hover:border-cyan-500 transition-all duration-300 hover:bg-slate-700/30 group-hover/upload:scale-105">
                  <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/upload:bg-cyan-500/20 transition-colors">
                    <svg className="w-8 h-8 text-slate-400 group-hover/upload:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-slate-300 font-medium mb-1">Tap to capture or upload</p>
                  <p className="text-slate-500 text-sm">Take a photo of the civic issue</p>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover/upload:scale-105 transition-transform">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
                      <p className="text-white text-sm font-medium">✓ Image captured</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-cyan-500 rounded-full p-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Location Section */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Location Data</h2>
                <p className="text-slate-400 text-sm">Pinpoint the issue location</p>
              </div>
            </div>

            <button
              onClick={fetchLocation}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Get Current Location
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
            </button>

            {location && (
              <div className="mt-6 space-y-4">
                <div className="bg-slate-700/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Current Location</p>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{location}</p>
                </div>
                {mapUrl && (
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-600/30">
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="200"
                      className="rounded-2xl"
                      loading="lazy"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="group relative">
          <div className={`absolute -inset-1 rounded-3xl blur transition duration-1000 ${
            isAnalyzing 
              ? "bg-slate-600 opacity-50" 
              : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 animate-pulse"
          }`}></div>
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className={`relative w-full py-6 px-8 font-bold text-xl rounded-3xl transition-all duration-300 transform shadow-2xl ${
              isAnalyzing
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-cyan-500/25"
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-4">
                <svg className="animate-spin w-7 h-7" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing with AI...</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
                </div>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze with AI
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
            )}
          </button>
        </div>

        {/* Analysis Result */}
        {analysis && (
          <div className="group relative animate-in slide-in-from-bottom-4 duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">AI Analysis</h2>
                  <p className="text-slate-400 text-sm">Issue description generated</p>
                </div>
              </div>
              <div className="bg-slate-700/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-600/50">
                <p className="text-slate-200 leading-relaxed font-medium">{analysis}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email Section */}
        {emailBody && (
          <div className="group relative animate-in slide-in-from-bottom-4 duration-700">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">Email Draft</h2>
                  <p className="text-slate-400 text-sm">Ready to send report</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-700/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <p className="text-slate-400 text-xs font-medium">TO: nagarayuktmathura@gmail.com</p>
                  </div>
                  <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">{emailBody}</pre>
                </div>

                {preview && (
                  <div className="bg-slate-700/40 rounded-2xl p-4 border border-slate-600/30">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <p className="text-slate-400 text-sm font-medium">Attached Evidence</p>
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={preview}
                        alt="Email attachment preview"
                        width={200}
                        height={150}
                        className="w-full h-28 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                )}

                <button
                  onClick={sendEmail}
                  className="w-full py-5 px-6 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Report Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                
                <div className="text-center">
                  <p className="text-slate-500 text-xs">
                    Opens your email app with pre-filled complaint
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-slate-400 text-xs">Secure & Private</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}