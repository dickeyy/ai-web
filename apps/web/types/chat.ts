export type Chat = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    messages: ChatMessage[];
};

export type ChatMessage = {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    role: "user" | "assistant";
};
