"use client";

import { ArrowUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function PromptInput() {
    const { isSignedIn, isLoaded } = useAuth();
    const [value, setValue] = useState("");

    if (!isSignedIn || !isLoaded) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="flex flex-col items-center gap-2"
        >
            <div className="flex w-full flex-row items-center gap-2">
                <div className="flex w-full flex-row rounded-full bg-muted/40 p-2 pl-6">
                    <Textarea
                        placeholder="Type your message here..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="m-0 h-9 max-h-52 min-h-fit resize-none border-0 bg-transparent px-0 focus:ring-0 focus-visible:ring-0"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="ml-auto gap-1.5 rounded-full"
                        disabled={value.length === 0}
                    >
                        <ArrowUpIcon className="size-4" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-xs text-foreground/60">
                    AI <span className="font-serif italic">often</span> makes mistakes, check
                    important info.
                </p>
            </div>
        </motion.div>
    );
}
