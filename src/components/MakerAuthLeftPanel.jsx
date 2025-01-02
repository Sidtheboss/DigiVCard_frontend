import React from "react";
import { useNavigate } from "react-router-dom";

const LeftPanel = ({ links }) => {
  const navigate = useNavigate();

  return (
    <aside className="bg-blue-900 text-white w-1/4 p-6">
      <h2 className="text-xl font-bold mb-4">Welcome</h2>
      <p className="text-lg mb-6">Akash</p>
      <nav className="space-y-4">
        {links.map((link, index) => (
          <a
            key={index}
            className="block hover:underline"
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default LeftPanel;
