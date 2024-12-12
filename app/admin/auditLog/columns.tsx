"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EmployeeAuditLog = {
  id: number; // ID tự động tăng
  action: string; // Hành động (e.g., CREATE, UPDATE, DELETE)
  employeeId?: number | null; // ID nhân viên (có thể null)
  field?: string | null; // Trường bị thay đổi (e.g., name, email)
  oldValue?: string | null; // Giá trị cũ của trường
  newValue?: string | null; // Giá trị mới của trường
  modifiedBy: string; // Người thực hiện thay đổi
  modifiedAt: Date; // Thời điểm thay đổi
  ipAddress: string; // Địa chỉ IP
  suspiciousActivity: boolean; // Có hoạt động đáng ngờ không
  suspiciousReason?: string | null; // Lý do đáng ngờ (nếu có)
};

export const columns: ColumnDef<EmployeeAuditLog>[] = [
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "field",
    header: "Field",
  },
  {
    accessorKey: "oldValue",
    header: "Old Value",
  },
  {
    accessorKey: "newValue",
    header: "New Value",
  },
  {
    accessorKey: "modifiedBy",
    header: "Modified By",
  },
  {
    accessorKey: "modifiedAt",
    header: "Modified At",
    cell: ({ row }) => new Date(row.original.modifiedAt).toLocaleString(), // Format ngày giờ
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
  },
  {
    accessorKey: "suspiciousActivity",
    header: "Suspicious Activity",
    cell: ({ row }) => (row.original.suspiciousActivity ? "Yes" : "No"), // Hiển thị Yes/No
  },
  {
    accessorKey: "suspiciousReason",
    header: "Suspicious Reason",
  },
];
