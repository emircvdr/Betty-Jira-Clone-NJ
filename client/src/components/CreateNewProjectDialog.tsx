/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FaPlusCircle } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { createProject } from '@/app/api/projectAPI'

const CreateNewProjectDialog = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const userId = Cookies.get("user");
    const workplace = Cookies.get("workplace");
    const handleCreateProject = async () => {
        try {
            await createProject(projectName, userId, workplace);
            setProjectName("");
            // const data = await fetchWorkplaces(userId);
            // setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='w-full p-3 flex gap-2 justify-start items-center'><FaPlusCircle />Create a new Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a Project</DialogTitle>
                    <DialogDescription>
                        Create a new proejct to start collaborating with your team.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Project Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Enter a name for your project"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogClose>
                    <Button className="w-full" onClick={handleCreateProject}>Create</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewProjectDialog