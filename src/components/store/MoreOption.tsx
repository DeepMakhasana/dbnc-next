import { Bookmark, MoreVertical, Telescope, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";

const MoreOption = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical className="w-5 h-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/"}>
          <DropdownMenuItem>
            <Telescope /> Explore
          </DropdownMenuItem>
        </Link>
        <Link href={"/saved"}>
          <DropdownMenuItem>
            <Bookmark /> Saved
          </DropdownMenuItem>
        </Link>
        <Link href={"/profile"}>
          <DropdownMenuItem>
            <User /> Profile
          </DropdownMenuItem>
        </Link>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOption;
