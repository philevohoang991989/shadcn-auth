'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage(){
    const session = useSession()
    console.log({session});
    
    if(session){
        return redirect('/log-in')
      }
    return(
<div></div>
    )
}