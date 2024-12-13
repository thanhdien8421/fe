import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFilePowerpoint } from "react-icons/fa6"
export const iconFiles = [
  {
    type: 'application/pdf',
    icon: FaFilePdf,
    color: 'text-red-500'
  },
  {
    type: 'image/jpeg',
    icon: FaFileImage,
    color: 'text-green-500'
  },
  {
    type: 'image/png',
    icon: FaFileImage,
    color: 'text-green-500'
  },
  {
    type: 'application/msword',
    icon: FaFileWord,
    color: 'text-blue-500'
  },
  {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    icon: FaFileWord,
    color: 'text-blue-500'
  },
  {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    icon: FaFileExcel,
    color: 'text-yellow-500'
  },
  {
    type: 'application/vnd.ms-excel',
    icon: FaFileExcel,
    color: 'text-yellow-500'
  },
  {
    type: 'application/vnd.ms-powerpoint',
    icon: FaFilePowerpoint,
    color: 'text-purple-500'
  }
]

export const formatFileSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}