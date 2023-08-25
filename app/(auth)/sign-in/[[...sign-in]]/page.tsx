import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className = "flex flex-col items-center justify-center bg-black h-screen">
      <SignIn />
    </div>
  );
}