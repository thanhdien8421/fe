import { SignupForm } from "@/components/Login/Signup-form";

export default function () {
  return (
    <div className="bg-white flex flex-col items-center py-10 bg-custom">
      <div className="w-[500px]">
        <SignupForm />
      </div>
    </div>
  );
}
