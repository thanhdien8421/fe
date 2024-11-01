import { MdDriveFileMoveOutline } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CVUpload from "./UploadFile";
import { Input } from "@/components/ui/input";
MdDriveFileMoveOutline;

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Ứng tuyển trực tiếp</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[800px]">
        <DialogHeader>
          <DialogTitle>Upload Profile</DialogTitle>
          <DialogDescription className="text-[1.25rem] text-black font-bold">
            Ứng tuyển{" "}
            <span className=" text-green-500 font-bold">
              Nhân Viên Kinh Doanh Tư Vấn Bán Hàng Thu Nhập Từ 10 - 25 Triệu
            </span>
            {/* chỗ này cần có title cho Nhân viên... từ 10-25 triệu */}
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="">
            <div className="flex flex-row text-start">
              <MdDriveFileMoveOutline size={25} className="text-green-500" />
              <h3 className="text-[18px] font-normal"> Chọn CV để ứng tuyển</h3>
            </div>

            <div className="flex flex-col text-center justify-center m-3">
              <CVUpload />
            </div>
          </div>
          <p className="text-green-500 m-3">
            Vui lòng nhập đầy đủ thông tin chi tiết:{" "}
            <span className="text-red-600">(*) Thông tin bắt buộc</span>
          </p>
          <div className="flex flex-col justify-center items-center">
            <Input type="text" placeholder="Họ và tên" />
            <div className="flex flex-row justify-space w-full mt-3">
              <Input type="email" placeholder="Email" className="mr-3" />
              <Input type="text" placeholder="Số điện thoại" />
            </div>
          </div>
        </div>
        <DialogFooter className="justify-center">
          <button
            type="submit"
            className="border border-gray-700 rounded-lg m-3 p-2 bg-green-500"
          >
            Nộp hồ sơ ứng tuyển
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
