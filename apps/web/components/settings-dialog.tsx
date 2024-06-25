import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function SettingsDialog({
    isOpen,
    onStateChange
}: {
    isOpen: boolean;
    onStateChange: (isOpen: boolean) => void;
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onStateChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
