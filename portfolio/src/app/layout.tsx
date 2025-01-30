import './globals.css';
import { Inter } from 'next/font/google';
import AnimatedBackground from '../components/AnimatedBackground';
import { ThemeProvider } from '../contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mohammad K. Hussain',
  description:
    'Software Developer | Open Source Gardener: planting PRs, pruning Bugs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 overflow-x-hidden transition-colors duration-200`}
      >
        <ThemeProvider>
          <AnimatedBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
