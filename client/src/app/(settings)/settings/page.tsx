"use client"
import { deleteWorkplace, fetchWorkplaces, updateWorkplace } from "@/app/api/workplacesAPI"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


const Settings = () => {
    const userId = Cookies.get("user")
    const selectedWorkplace = Cookies.get("workplace")

    const [selectedWorkplaceName, setSelectedWorkplaceName] = useState("")


    useEffect(() => {
        const listWorkplaces = async () => {
            try {
                const data = await fetchWorkplaces(userId)
                const filteredData = data.filter((workplace) => {
                    return workplace.id == selectedWorkplace
                })
                setSelectedWorkplaceName(filteredData[0].workplaceName)

            } catch (error) {
                console.error("Bir hata oluştu: ", error);
            }
        }
        listWorkplaces()
    }, [])

    const handleChangeWorkplaceName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedWorkplaceName(e.target.value)
    }

    const handleUpdate = async () => {
        try {
            const workplaceId = Number(selectedWorkplace);
            await updateWorkplace(workplaceId, selectedWorkplaceName);
            toast.success("Workplace Successfully Updated");
        } catch (error) {
            console.error("Güncelleme sırasında hata oluştu:", error);
        }
    }

    const handleDelete = async () => {
        try {
            const workplaceId = Number(selectedWorkplace);
            await deleteWorkplace(workplaceId);
            toast.success("Workplace Successfully Deleted");
        } catch (error) {
            console.error("Silme sırasında hata oluştu:", error);
        }
    }


    return (
        <div className="w-full h-full flex items-center justify-center flex-col gap-5">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Edit Selected Workplace</CardTitle>
                    <CardDescription>
                        Edit the name of the selected workplace
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Workplace Name</Label>
                                <Input id="name" value={selectedWorkplaceName} onChange={handleChangeWorkplaceName} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleUpdate}>Save Changes</Button>
                </CardFooter>
            </Card>
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle className="text-red-600">
                        Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete this workplace?
                        If you delete this workplace, all the data will be lost.
                    </p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="mt-4">Delete</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure?
                                </DialogTitle>
                                <DialogDescription>
                                    If you delete this workplace, all the data will be lost.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose>
                                <Button type="button" variant="destructive" className="w-full" onClick={handleDelete}>Delete</Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>

                </CardContent>
            </Card>
        </div>
    )
}

export default Settings