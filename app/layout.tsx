import "./globals.css";
import Providers from "./providers";
import { Navbar } from "../components/Navbar";

export const metadata = {
  title: "Echo",
  description: "AI Social Planner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}