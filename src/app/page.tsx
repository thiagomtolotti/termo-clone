import { Footer } from "@/components/Footer/Footer";
import { GuessArea } from "@/components/GuessArea/GuessArea";
import { Header } from "@/components/Header/Header";
import { Notification } from "@/components/Notification/Notification";

export default function Home() {
  return (
    <>
      <Header />
      <Notification />
      <GuessArea />
      <Footer />
    </>
  );
}
