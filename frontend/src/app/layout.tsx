// frontend/src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

export const metadata = {
  title: "FairLens Dashboard",
  description: "Enterprise Data Bias Analysis via AIF360",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: "#050505",
              colorPrimary: "#f5f5f5",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
