import { GuessLetter } from "@/components/GuessLetter/GuessLetter";
import { GuessRow } from "@/components/GuessRow/GuessRow";
import { Header } from "@/components/Header/Header";

export default function Home() {
	return (
		<>
			<Header />
			<GuessRow active />
		</>
	);
}
