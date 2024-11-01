"use client";
import { Label } from "@/components/ui/label";
import { SwitchStatus } from "../ui/Status";
import { useCallback, useState } from "react";
function SwitchStatusBtn() {
  let [checked, setChecked] = useState(false);
  let onchange = () => {
    setChecked(!checked);
  };
  return (
    <div className="flex items-center space-x-2">
      <SwitchStatus
        id="airplane-mode"
        onCheckedChange={onchange}
        checked={checked}
      />
      <Label htmlFor="airplane-mode"></Label>
    </div>
  );
}

export default SwitchStatusBtn;
