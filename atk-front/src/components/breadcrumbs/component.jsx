"use client";

import { useParams } from "next/navigation";
import { Home } from "lucide-react";

const Breadcrumbs = ({ items }) => {
    const { lang } = useParams(); // Получаем текущий язык

    const currentItems = items[lang] || [];

    return (
        <nav className="flex items-center text-gray-500 text-sm md:hidden sm:hidden">
            <a href={`/${lang}`} className="flex items-center text-gray-700 hover:text-black">
                <Home className="w-4 h-4 xl:w-3.5 xl:h-3.5 lg:w-3.5 lg:h-3.5 sm:w-3 sm:h-3" />
            </a>

            {currentItems.map((item, index) => (
                <div key={index} className="flex items-center">
                    <span className="mx-2 text-[#9E9E9E] text-[14px] xl:text-[12px] lg:text-[11px] sm:text-[10px]">/</span>
                    {index === currentItems.length - 1 ? (
                        <span className="text-[#9E9E9E] text-[14px] xl:text-[12px] lg:text-[11px] sm:text-[10px]">{item.label}</span>
                    ) : (
                        <a href={item.href} className="text-[#0184DA] text-[14px] xl:text-[12px] lg:text-[11px] sm:text-[10px]">
                            {item.label}
                        </a>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;