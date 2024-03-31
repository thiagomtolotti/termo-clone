import { Footer } from "@/components/Footer/Footer";
import { GuessArea } from "@/components/GuessArea/GuessArea";
import { Header } from "@/components/Header/Header";
import { Keyboard } from "@/components/Keyboard/Keyboard";
import { Notification } from "@/components/Notification/Notification";
import { ApplicationProvider } from "@/context/ApplicationContext";

export default function Home() {
  return (
    <ApplicationProvider>
      <Header />
      <Notification />
      <GuessArea />
      <Keyboard />
      <Footer />
    </ApplicationProvider>
  );
}
