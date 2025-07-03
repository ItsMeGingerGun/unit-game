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
      <body>
        {/* Background blobs */}
        <div className="background-blobs">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="background-blob"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                background: `radial-gradient(
                  circle, 
                  rgba(${i % 2 === 0 ? '126, 34, 206' : '79, 70, 229'}, 0.3), 
                  transparent
                )`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
        
        {children}
      </body>
    </html>
  );
}
