import "./globals.css";

export const metadata = {
  title: "FLASH Dashboard",
  description: "Admin dashboard for FLASH commerce"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
