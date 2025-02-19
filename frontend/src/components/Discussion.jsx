import { Typewriter, useTypewriter } from "react-simple-typewriter";
import React from "react";
import "../assets/css/discussion.css";
export default function Discussion() {
  return (
    <h1 style={{ marginTop: "15%", textAlign: "center", fontSize: "36px" }}>
      <Typewriter
        words={[
          "Coming soon...",
          "Coding has over 700 languages",
          "The first computer virus was a Creeper.",
        ]}
        loop={null}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={500}
      />
    </h1>
  );
}
