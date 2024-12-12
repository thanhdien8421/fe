"use client";

import React, { useState, useEffect } from "react";
import { EmployeeAuditLog, columns } from "./columns";
import { DataTable } from "./data-table";

const RecruitmentedList = () => {
  const [jobData, setJobData] = useState<EmployeeAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/admins/audit-log`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.data);
      setJobData(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <div className="flex flex-col justify-center m-2 p-5">
      <DataTable columns={columns} data={jobData} />
    </div>
  );
};

export default RecruitmentedList;
