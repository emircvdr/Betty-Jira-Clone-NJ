/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSidebar } from "@/components/ui/sidebar"

export function CustomTrigger({ pageTitle, icon }: { pageTitle: string, icon: any }) {
    const { toggleSidebar } = useSidebar()

    return <button onClick={toggleSidebar}>
        <div className="flex flex-row items-center gap-2 justify-start">
            {icon}
            <h1 className="text-xl text-muted-foreground">{pageTitle}</h1>
        </div>
    </button>
}

export default CustomTrigger