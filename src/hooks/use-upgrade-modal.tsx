import { UpgradeModel } from "@/components/upgrade-model";
import { useState } from "react";

export const useUpgradeModal = () => {
    const [open, setOpen] = useState(false);

    const handleError = (error: any) => {
        console.log("Handling error in useUpgradeModal:", error);
        if (error?.data?.code === "FORBIDDEN") {
            setOpen(true);
            return true
        }
        return false
    };

    const modal = <UpgradeModel open={open} onOpenChange={setOpen} />

    return { handleError, modal };
}