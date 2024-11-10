"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { GithubIcon, HeyGenLogo } from "./Icons";
import { ThemeSwitch } from "./ThemeSwitch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  return (
    <Navbar className="w-full">
      <NavbarBrand>
        <Link href="/">
          <HeyGenLogo />
          <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text ml-4">
            <p className="text-xl font-semibold text-transparent">Omniverse</p>
          </div>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex flex-row items-center gap-4">
          <Link isExternal color="foreground" href="/tutors">
            Tutors
          </Link>
          <Link isExternal color="foreground" href="/courses">
            Courses
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <AccountCircleIcon sx={{ fontSize: "3rem" }} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
