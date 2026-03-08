import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenTool, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDark, setIsDark] = useState((localStorage.getItem("theme") || "light") === "dark");

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // apply light/dark class to body
  React.useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="p-1 bg-primary rounded-md">
            <PenTool className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary hidden sm:inline">
            AI Blog Generator
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="link" size="sm" asChild>
            <Link to="/editor">Editor</Link>
          </Button>

          <Button variant="link" size="sm" asChild>
            <Link to="/history">History</Link>
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
