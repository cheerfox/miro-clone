import { useEffect } from "react";

// 如果別人的螢幕比你的大，可能會不小心觸發 scroll event
export const useDisableScrollBounce = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");

    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);
};
