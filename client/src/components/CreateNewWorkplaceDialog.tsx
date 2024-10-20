
import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FaPlusCircle } from 'react-icons/fa'
import { createWorkplace, fetchWorkplaces } from '@/app/api/workplacesAPI'
import Cookies from 'js-cookie'
import { useSidebarContext } from '@/context/SiderbardContext'

const CreateNewWorkplaceDialog = () => {
    const { setWorkplaces } = useSidebarContext();
    const [workplaceName, setWorkplaceName] = useState("");
    const userId = Cookies.get("user");
    const handleCreateWorkplace = async () => {
        try {
            await createWorkplace(workplaceName, userId);
            setWorkplaceName("");
            const data = await fetchWorkplaces(userId);
            setWorkplaces(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='w-full p-3 flex gap-2 justify-start items-center'><FaPlusCircle />Create a new Workplace</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a Workplace</DialogTitle>
                    <DialogDescription>
                        Create a new workplace to start collaborating with your team.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Workplace Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Enter a name for your workplace"
                            value={workplaceName}
                            onChange={(e) => setWorkplaceName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogClose>
                    <Button className="w-full" onClick={handleCreateWorkplace}>Create</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewWorkplaceDialog