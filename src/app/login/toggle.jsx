"use client";
import { useState } from "react";
import { motion as m, AnimatePresence } from 'motion/react';

import SignIn from "./signin";
import SignUp from "./signup";

export default function ToggleAuth() {
    const [showSignIn, setShowSignIn] = useState(true);

    return (
        <m.div
            className='form-container'
        >
            <div className='toggle'>
                <button className="toggle-button" onClick={() => setShowSignIn(true)}>Sign In</button>
                <button className="toggle-button" onClick={() => setShowSignIn(false)}>Sign Up</button>
                <m.span
                    className='toggle-indicator'
                    initial={{ x: showSignIn ? "0%" : "50%" }}
                    animate={{ x: showSignIn ? "0%" : "100%" }}
                />
            </div>
            <AnimatePresence mode="popLayout">
                {showSignIn ? (
                    <m.div
                        key="sign-in-key"
                        className="form-div"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{
                            duration: 0.25,
                            type: "spring",
                            stiffness: 500,
                            damping: 30

                        }}
                    >
                        <SignIn />
                    </m.div>
                ) : (
                    <m.div
                        key="sign-up-key"
                        className="form-div"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{
                            duration: 0.25,
                            type: "spring",
                            stiffness: 500,
                            damping: 30

                        }}
                    >
                        <SignUp />
                    </m.div>
                )}
            </AnimatePresence>
        </m.div>
    );
}
