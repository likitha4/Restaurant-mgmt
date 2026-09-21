import { useEffect } from "react";

function useScrollAnimation(dependency) {
  useEffect(() => {
    const timer= setTimeout(()=>{
    const cards = document.querySelectorAll("[data-animate]");

    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      },
    );
    cards.forEach((card) => observer.observe(card));


    return () => observer.disconnect();
  },1000);
  return ()=>clearTimeout(timer);
  }, [dependency]);
}

export default useScrollAnimation;
