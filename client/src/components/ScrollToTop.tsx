import React from "react";
import { Button } from "flowbite-react";
import { HiMiniArrowUpTray } from "react-icons/hi2";

type ScrollToTopProps = {
  footerHeight: number;
};

const BASE_OFFSET = 24; // right-6

export default function ScrollToTop({ footerHeight }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [bottomOffset, setBottomOffset] = React.useState<number>(BASE_OFFSET);

  const handleScroll = React.useCallback(() => {
    const fullHeight = document.documentElement.scrollHeight;
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const distanceFromBottom = fullHeight - (scrolled + viewportHeight);

    setIsVisible(scrolled > 300); // show button after 300px

    if (distanceFromBottom > footerHeight) {
      setBottomOffset(BASE_OFFSET);
    } else {
      setBottomOffset(footerHeight - distanceFromBottom + BASE_OFFSET);
    }
  }, [footerHeight]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Button
      aria-label="Scroll to top"
      className={`fixed right-6 z-10 size-13 cursor-pointer rounded-full p-0 transition-all duration-200 sm:size-15 ${isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      style={{ bottom: `${bottomOffset}px` }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <HiMiniArrowUpTray className="size-6" />
    </Button>
  );
}
