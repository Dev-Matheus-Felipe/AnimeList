import ProfilePictureProvider from "@/components/providers/profilePictureProvider";
import AnimeListProvider from "@/components/providers/animeListProvider";
import ModalProvider from "@/components/providers/modalProvider";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import './global.css'

export const metadata: Metadata = {
  title: "AnimeList",
  description: "Anime List is a platform where you can explore anime categories, search for any title, genre or type you want, save your favorite ones and manage your personal profile.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AnimeListProvider>
            <ModalProvider>
              <ProfilePictureProvider>
                <main>
                  {children}
                </main>
              </ProfilePictureProvider>
            </ModalProvider>
          </AnimeListProvider>
        </ThemeProvider>
      </body>
    </html>

  );
}
