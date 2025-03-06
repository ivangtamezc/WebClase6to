// app/layout.tsx
import './globals.css';
import './style.css';

export const metadata = {
    title: 'My Next.js Project',
    description: 'A simple project migrated from HTML/CSS/JS to Next.js',
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <head>
                <script src="/scripts/script.js" defer></script>
            </head>
            <body>{children}</body>
        </html>
    );
}
