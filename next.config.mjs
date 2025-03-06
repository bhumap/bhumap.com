/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "icons.veryicon.com" },
      { protocol: "https", hostname: "img.icons8.com" },
      { protocol: "https", hostname: "bhumap.s3.ap-south-1.amazonaws.com" },
    ],
  },
  env: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    NEXT_PUBLIC_AWS_S3_REGION: process.env.NEXT_PUBLIC_AWS_S3_REGION
  }
};

export default nextConfig;
