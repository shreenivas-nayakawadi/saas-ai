"use client";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
      const [isMounted, setIsMounted] = useState(false);

      useEffect(() => {
            setIsMounted(true);
      }, []);

      if (!isMounted) {
            return null;
      }

      return (
            <Sheet>
                  <SheetTrigger asChild>
                        <Button
                              variant="ghost"
                              className="md:hidden"
                              size="icon"
                        >
                              <Menu />
                        </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0">
                        <SheetTitle className="hidden"></SheetTitle>
                        <Sidebar />
                  </SheetContent>
            </Sheet>
      );
};

export default MobileSidebar;
