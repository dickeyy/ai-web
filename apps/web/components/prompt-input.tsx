"use client";

import { ArrowUpIcon, MoveUpRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function PromptInput() {
    const { isSignedIn, isLoaded } = useAuth();
    const [value, setValue] = useState("");
    const textVariants = {
        hidden: { width: 0, opacity: 0, x: 20 },
        visible: { width: "auto", opacity: 1, x: 0 }
    };

    // handle resizing textarea
    useEffect(() => {
        const textarea = document.querySelector("textarea");
        if (textarea) {
            textarea.style.height = "1px";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

    if (!isSignedIn || !isLoaded) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="flex w-full flex-col items-center gap-2"
        >
            <div className="flex w-full flex-row items-center gap-2">
                <div className="flex w-full flex-row items-end rounded-[26px] border border-muted-foreground/5 bg-muted/40 p-2 pl-2 shadow-sm">
                    {/* text area with starting height of 1 line which expands to fit content */}
                    <Textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="h-9 max-h-52 min-h-9 w-full resize-none border-none shadow-none focus:ring-0 focus-visible:ring-0"
                        placeholder="Ask me anything..."
                    />

                    <Button
                        type="submit"
                        className="ml-auto gap-1.5 rounded-full"
                        disabled={value.length === 0}
                    >
                        <AnimatePresence>
                            {value.length === 0 && (
                                <motion.p
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={textVariants}
                                    transition={{ duration: 0.2 }}
                                >
                                    Send
                                </motion.p>
                            )}
                        </AnimatePresence>
                        <MoveUpRightIcon className="size-4" />
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
