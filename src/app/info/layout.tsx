import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">{children}</main>
      <Footer />
    </>
  );
}
