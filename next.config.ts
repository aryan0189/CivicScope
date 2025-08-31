// import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Remove Next.js development indicators
//   devIndicators: {
//     buildActivity: false,
//     buildActivityPosition: 'bottom-right',
//   },
//   // Hide the Next.js powered-by header
//   poweredByHeader: false,
// }

// export default nextConfig;
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Remove Next.js development indicators
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Hide the Next.js powered-by header
  poweredByHeader: false,
}

export default nextConfig