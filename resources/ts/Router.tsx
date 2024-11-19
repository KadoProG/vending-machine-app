import { AboutPage } from "@/pages/about";
import { HomePage } from "@/pages/home";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    );
};
