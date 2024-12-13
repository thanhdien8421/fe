import { FaTrashAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button'


export default function TrashButton({val, refetch} : {val : string, refetch: () => void}) {
    async function onClick(val : string) {
        const url = `http://localhost:8000/api/v1/${val}`;
        
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
      
          const result = await response.json();
          if (result?.response?.error) {
            throw new Error(result?.response?.error);
          }
          refetch();
          return {
            message: "Xóa thành công",
            success: true,
            user: result?.data?.user,
          };
        } catch (error) {
          return {
            message: "Xóa không thành công",
            success: true,
            user: null,
          };
        }
    }
    return(
        <Button className="text-red-700 bg-white border-red-700 border-2 w-8 h-8 hover:bg-red-200" onClick={() => onClick(val)}>
            <FaTrashAlt/>
        </Button>
    )
}