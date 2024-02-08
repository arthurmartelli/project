import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"

import { Button } from "../ui/button"

type Props = {
    title: string,
    description: string,
    children: React.ReactNode
}

export function FormDialog({ title, description, children }: Props) {

    return <Dialog>
        <DialogTrigger>
            <Button>{title}</Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>


}
