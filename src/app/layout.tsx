import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Taahirah Denmark — Tech Portfolio",
  description: "Taahirah Denmark’s software engineering projects in an immersive video-like interface",
  openGraph: {
    title: "Taahirah Denmark — Tech Portfolio",
    description: "Projects, case studies, and demos by Taahirah Denmark",
    images: [
      {
        url: "/opengraph-image", // served by app/opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: "Taahirah Denmark — Tech Portfolio",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
        <footer className="border-t border-gray-800 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-400 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Taahirah Denmark</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Engineernoob"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-blue transition-colors"
                aria-label="GitHub — Taahirah Denmark"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.69.24 2.94.12 3.25.78.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/taahirah-denmark-4b1441196/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-blue transition-colors"
                aria-label="LinkedIn — Taahirah Denmark"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.06C12.63 8.9 14.4 8 16.6 8 21.14 8 22 10.96 22 15.2V24h-4v-7.4c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.83 1.9-2.83 3.88V24h-4V8z" />
                </svg>
              </a>
              <span className="text-neon-purple font-mono">Built with Next.js</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
