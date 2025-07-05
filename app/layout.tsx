// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Unit Conversion Game',
  description: 'Farcaster Unit Conversion Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="relative">
        {/* Background blobs container - outside of main content */}
        <div className="background-blobs">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="background-blob animate-float"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(${
                  i % 2 === 0 ? '126, 34, 206' : '79, 70, 229'
                }, 0.15), transparent)`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
