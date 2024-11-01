import { LoginForm } from "@/components/Login/Login-form"
import { Card } from "@/components/ui/card"

export default function() {
    return(
    <div className="bg-white flex flex-col items-center h-screen pt-10">
        <div className="max-w-md w-full">
    <LoginForm/>
    </div>
    </div>
    )
}
