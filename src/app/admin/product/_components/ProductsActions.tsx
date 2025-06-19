"use client"

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct, toggleProductAvailablity } from "../../_actions/products";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({ 
  id,isAvailableForPurchase }:{id:string , isAvailableForPurchase :boolean}){
    const [isPending , startTransition] = useTransition();
  return <DropdownMenuItem
    disabled={isPending}
    onClick={()=>{
    startTransition(async ()=>{
      await toggleProductAvailablity(id,!isAvailableForPurchase)
    })
  }}>{isAvailableForPurchase ? "Deactivate" : "Activate"}</DropdownMenuItem>
}



export function DeleteDropdownItem({id,disabled}:{id:string , disabled:boolean}) { 
  const [isPending , startTransition] = useTransition();
  const router = useRouter()
  return <DropdownMenuItem
    variant="destructive"
    disabled={isPending}
    onClick={()=>{
    startTransition(async ()=>{
      await deleteProduct(id)
      router.refresh();
    })
  }}>
    Delete
  </DropdownMenuItem>
}
