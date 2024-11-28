import { FaPen } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import Link from "next/link";

export default function EditButton({val} : {val : string}) {
    return(
        <Link href={val}>
        <Button className="text-green-500 bg-white border-green-500 border-2 w-8 h-8">
            <FaPen/>
        </Button>
        </Link>
    )
}