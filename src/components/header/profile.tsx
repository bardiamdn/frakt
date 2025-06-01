import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogoutButton } from "../logout-button";

export default function Profile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-0 bg-background-accent">
        {/* <div className="relative w-full h-full"> */}
        <Image
          src={"/Male.jpg"}
          alt="Profile Picture"
          className=""
          width={50}
          height={50}
          priority
        />
        {/* </div> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel className="text-center">John Doe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
