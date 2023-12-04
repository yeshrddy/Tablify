import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { PenSquare } from "lucide-react";


export default function Edit(props: Record<string, any>) {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const { toast } = useToast()

    const handleUpdate=()=>{
      setName(props.row.original.name);
      setEmail(props.row.original.email);
      setRole(props.row.original.role);
    }
    const handleSubmit = () => {
      toast({description: "Changes saved successfully!"})
      //update name
      props.table.options.meta?.updateData(props.row.getAllCells()[1].row.index, props.row.getAllCells()[1].column.id, name);
      //update email
      props.table.options.meta?.updateData(props.row.getAllCells()[2].row.index, props.row.getAllCells()[2].column.id, email);
      //update role
      props.table.options.meta?.updateData(props.row.getAllCells()[3].row.index, props.row.getAllCells()[3].column.id, role);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          key={props.row.original.id } 
          onClick={handleUpdate}
        >
          <PenSquare className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save once you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Role</Label>
              <Select defaultValue={role} onValueChange={(value) => setRole(value)} >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <span className="font-medium">Admin</span>
                  </SelectItem>
                  <SelectItem value="member" onClick={(e)=>console.log(e.target)} >
                    <span className="font-medium">Member</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" >
            Cancel
          </Button>
          <DialogClose asChild>
            <Button 
              type="submit"
              onClick={handleSubmit}
              >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent> 
    </Dialog>
  );
}