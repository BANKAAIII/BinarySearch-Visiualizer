import React from "react";
import gsap from "gsap";
import { useRef ,useLayoutEffect } from "react";

const Title = ({label}) => {
    const titleRef = useRef(null);

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
      });
  
      return () => ctx.revert();
    }, []);
    return <div className=" flex justify-center">
        <div className="flex flex-col justify-center h-full ">
            <div ref={titleRef} className="text-8xl text-yellow-400 mt-10 pt-40 mb-10 ml-5 mr-5 font-bold italic">{label} </div>   
        </div>    
    </div>
}

export default Title