import React from "react";
const pageTabs = {
  padding: "30px 20px",
  width: "100%",
};

export default function PageTabs({ children, title }) {
  return (
    <section style={pageTabs}>
      <h1 className="title">{title}</h1>
      {children}
    </section>
  );
}
