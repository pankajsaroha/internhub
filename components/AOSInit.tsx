"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSInit() {
    useEffect(() => {
        AOS.init({
            duration: 900,
            once: true,
        });
    }, []);

    return null;
}
