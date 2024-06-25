import Navbar from "@/components/navbar";
import PromptInput from "@/components/prompt-input";
import WelcomeTitle from "@/components/welcome-title";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-4">
            <Navbar />
            <WelcomeTitle />
            <div className="absolute bottom-4 flex w-[90%] flex-col items-center justify-center gap-4 md:w-2/3 lg:w-1/2 2xl:w-1/4">
                <PromptInput />
            </div>
        </div>
    );
}
