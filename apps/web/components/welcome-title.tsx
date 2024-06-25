"use client";

import { SignInButton, SignUpButton, useAuth, useUser } from "@clerk/nextjs";
import { delay, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function WelcomeTitle() {
    const { user } = useUser();
    const { isLoaded } = useAuth();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        setGreeting(determineGreeting());
    }, []);

    return (
        <div className="flex h-full w-full items-center justify-center p-4 text-center">
            {user && isLoaded ? (
                <h1 className="font-serif text-4xl text-foreground">
                    {greeting},{" "}
                    <span className="italic text-foreground/60">
                        <Typing text={user.firstName || user.emailAddresses[0].emailAddress} />
                    </span>
                </h1>
            ) : (
                <div className="flex w-full max-w-[30rem] flex-col items-center justify-center">
                    <motion.div
                        className="flex w-full flex-col items-center justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.4 }}
                    >
                        <h1 className="font-serif text-4xl text-foreground">
                            {greeting},{" "}
                            <span className="italic text-foreground/60">
                                <Typing text="stranger" />
                            </span>
                        </h1>
                        <p className="mt-4 text-sm text-foreground/60">
                            Please sign in to start using{" "}
                            <span className="font-serif italic text-foreground">ai.kyle.so</span>
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-8 flex w-full flex-row items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 1.4 }}
                    >
                        <Button variant="outline" className="w-full">
                            <SignInButton />
                        </Button>
                        <Button variant="default" className="w-full">
                            <SignUpButton />
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export function Typing({ text, className }: { text: string; className?: string }) {
    const characters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.04 * i, delay: 0.4 }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.span variants={container} initial="hidden" animate="visible" className={className}>
            {characters.map((char, index) => (
                <motion.span key={char + "-" + index} variants={child}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

const greetings = {
    morning: ["Good morning", "Morning", "Rise and shine", "Mornin'"],
    afternoon: ["Good afternoon", "Afternoon", "Good day", "Hey there"],
    evening: ["Good evening", "Evening", "Evenin'", "How was your day", "*yawn* hey"]
};

function determineGreeting(): string {
    const time = new Date().getHours();

    if (time < 12) {
        return greetings.morning[Math.floor(Math.random() * greetings.morning.length)];
    } else if (time < 18) {
        return greetings.afternoon[Math.floor(Math.random() * greetings.afternoon.length)];
    } else {
        return greetings.evening[Math.floor(Math.random() * greetings.evening.length)];
    }
}
