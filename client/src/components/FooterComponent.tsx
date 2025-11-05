import React from "react";
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import ScrollToTop from "./ScrollToTop";

export default function FooterComponent() {
  const footerRef = React.useRef<HTMLElement | null>(null);
  const [footerHeight, setFooterHeight] = React.useState<number>(0);

  // https://www.codemzy.com/blog/reactjs-useref-width-height
  React.useEffect(() => {
    function updateFooterHeight() {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.getBoundingClientRect().height);
      }
    }
    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);
    return () => window.removeEventListener("resize", updateFooterHeight);
  }, []);

  return (
    <>
      <Footer
        ref={footerRef}
        container
        className="rounded-none bg-gray-200 dark:bg-gray-700"
      >
        <FooterCopyright
          href="https://github.com/pawllo01"
          by="pawllo01"
          year={new Date().getFullYear()}
        />
        <FooterLinkGroup>
          <FooterLink
            href="https://github.com/pawllo01/qobuz-artist-discography"
            target="_blank"
          >
            GitHub Project
          </FooterLink>
        </FooterLinkGroup>
      </Footer>

      <ScrollToTop footerHeight={footerHeight} />
    </>
  );
}
