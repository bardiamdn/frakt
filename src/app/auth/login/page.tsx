import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full h-screen lg:flex contents">
      <div className="h-full w-1/2 p-4 pr-0 lg:block hidden">
        <div className="w-full h-full overflow-hidden relative rounded-4xl">
          <Image
            src={"/podium.jpg"}
            alt="abstract purple podium - cylinders"
            fill
            className="object-start object-cover"
          />
          {/* <span className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-purple text-center">
            <h1 className="text-3xl ">
              Get your clients and your business aligned with Frakt.
            </h1>
          </span> */}
        </div>
      </div>
      <div className="flex min-h-svh lg:w-1/2 w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
