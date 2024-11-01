import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SwitchStatusBtn from "../Switch/switchBtn"
import { Button } from "../ui/button"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { InfoJob } from "@/lib/data";
import Link from "next/link";

export function TableDemo() {
    return (
        <>
            <div className="w-[60px] h-[30px] hover:bg-gray-200 border border-gray-500 rounded-sm flex flex-row text-center justify-center "><Link href='/post'><IoMdAdd className="m-[5px]" /></Link></div>
            <Table className="border border-green-200 rounded-xl select-none">
                <TableCaption>Danh sách bài đăng của bạn.</TableCaption>
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead className="w-[5%] text-center">STT</TableHead>
                        <TableHead className="w-[40%] text-center">Mô tả</TableHead>
                        <TableHead className="text-center">Địa điểm</TableHead>
                        <TableHead className="text-center">Ngày tuyển dụng</TableHead>
                        <TableHead className="text-center">Ngày kết thúc</TableHead>
                        <TableHead >Trạng thái</TableHead>
                        <TableHead className="text-center">Chỉnh sửa</TableHead>
                        <TableHead className="text-center">Xóa bài viết</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {InfoJob.map((post) => (
                        <TableRow key={post.id} className="text-center">
                            <TableCell className="">{post.id}</TableCell>
                            <TableCell className="font-medium text-start">{post.title}</TableCell>
                            <TableCell className="w-[200px]">{post.location}</TableCell>
                            <TableCell>{post.start_date}</TableCell>
                            <TableCell>{post.end_date}</TableCell>
                            <TableCell ><SwitchStatusBtn /></TableCell>
                            <TableCell ><Button className="bg-gray-500 hover:bg-green-400"><FaRegEdit className="text-center h-full" />Chỉnh sửa</Button></TableCell>
                            <TableCell ><Button className="bg-red-500"><MdDeleteSweep />Xóa</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>

                    </TableRow>
                </TableFooter>
            </Table>

        </>
    )
}

