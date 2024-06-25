"use client";

import {
    Code2Icon,
    HelpCircleIcon,
    LogOutIcon,
    MoonIcon,
    SettingsIcon,
    SidebarOpenIcon,
    SunIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "./ui/sheet";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import SettingsDialog from "./settings-dialog";
import { useState } from "react";

export default function Navbar() {
    const { isSignedIn, isLoaded, signOut } = useAuth();
    const { user } = useUser();
    const { setTheme, theme } = useTheme();

    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

    return (
        <motion.div
            className="fixed top-0 flex w-screen justify-between bg-background p-2 px-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
        >
            {isSignedIn && isLoaded && (
                <Sheet>
                    <SheetTrigger>
                        <SidebarOpenIcon className="size-4 text-foreground/60" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            )}

            {isSignedIn && isLoaded && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="mt-1 size-5">
                            <AvatarFallback className="bg-muted text-xs">AI</AvatarFallback>
                            <AvatarImage
                                className="h-full w-full rounded-full bg-muted/40"
                                src="https://avatars.githubusercontent.com/u/41174949?v=4"
                            />
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4 mt-2 w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onSelect={() => {
                                    setSettingsDialogOpen(true);
                                }}
                            >
                                <SettingsIcon className="mr-2 h-[1rem] w-[1rem]" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="gap-2"
                                onSelect={() => {
                                    setTheme(theme === "dark" ? "light" : "dark");
                                }}
                            >
                                <MoonIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <SunIcon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span>Toggle theme</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="https://github.com/dickeyy/ai-web" target="_blank">
                                <Code2Icon className="mr-2 h-[1rem] w-[1rem]" />
                                GitHub
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="https://github.com/dickeyy/ai-web/issues" target="_blank">
                                <HelpCircleIcon className="mr-2 h-[1rem] w-[1rem]" />
                                Support
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="focus:bg-red-500/20"
                            onSelect={() => {
                                signOut();
                            }}
                        >
                            <LogOutIcon className="mr-2 h-[1rem] w-[1rem]" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            <SettingsDialog isOpen={settingsDialogOpen} onStateChange={setSettingsDialogOpen} />
        </motion.div>
    );
}
