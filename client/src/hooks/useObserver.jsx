import {useEffect, useRef} from "react";

export const useObserver = (ref, end, isLoad, callback) => {
    const observer = useRef()

    useEffect(() => {
        if (end) return
        if (observer.current) observer.current.disconnect();
        let cb = function (entries, observer) {
            if (entries[0].isIntersecting) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(ref.current);
    }, [isLoad])
}