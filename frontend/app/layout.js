import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Frontend',
  description: 'frontend for testing auth and task APIs'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}