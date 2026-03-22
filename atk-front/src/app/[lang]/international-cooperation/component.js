"use client";

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import { API } from "@/requester";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";

const InternatonalCooperation = ({ dict }) => {
    const [programs, setPrograms] = useState([]);
    const [programsProps, setProgramsProps] = useState({
        page: 1,
        pageSize: 3,
        count: 0,
    });

    const { lang } = useParams();
    const router = useRouter();

    // Функция для обработки текста
    const renderTextWithFormatting = (text) => {
        if (!text) return null;

        return text.split("\n\n").map((block, blockIndex) => {
            // Обработка заголовков любого уровня
            const headerMatch = block.match(/^(#{1,6})\s(.+)/);
            if (headerMatch) {
                const level = headerMatch[1].length; // Количество # определяет уровень заголовка
                const content = headerMatch[2].trim(); // Текст заголовка
                const Tag = `h${level}`; // Динамический тег заголовка
                return React.createElement(
                    Tag,
                    {
                        key: blockIndex,
                        className: `my-4 font-bold ${
                            level === 1
                                ? "text-3xl"
                                : level === 2
                                    ? "text-2xl"
                                    : level === 3
                                        ? "text-xl"
                                        : "text-lg"
                        }`,
                    },
                    content
                );
            }

            // Обработка маркированных списков
            if (block.startsWith("* ") || block.startsWith("- ")) {
                const items = block.split("\n").map((line) => line.replace(/^[\*\-]\s*/, "").trim());
                return (
                    <ul key={blockIndex} className="list-disc list-inside my-4">
                        {items.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        ))}
                    </ul>
                );
            }

            // Обработка нумерованных списков
            if (block.match(/^\d+\./)) {
                const items = block.split("\n").map((line) => line.replace(/^\d+\./, "").trim());
                return (
                    <ol key={blockIndex} className="list-decimal list-inside my-4">
                        {items.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        ))}
                    </ol>
                );
            }

            // Обычный текст или жирный текст
            return (
                <p key={blockIndex} className="my-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            );
        });
    };

        const handleGetPrograms = useCallback(async () => {
        const { data } = await API.get('education/courses-programms', {
            params: {
                page: programsProps.page,
                page_size: programsProps.pageSize,
                show_on_international: true,
            },
        });
        setPrograms(data?.results ?? []);
        setProgramsProps((prev) => ({ ...prev, count: data?.count ?? 0 }));
    }, [programsProps.page, programsProps.pageSize]);

    // Обработчик изменения страницы
    const handleChangePage = (e, page) => {
        setProgramsProps((prev) => ({ ...prev, page }));
    };

    useEffect(() => {
        handleGetPrograms();
    }, [handleGetPrograms]);

    const pages = Math.max(1, Math.ceil(programsProps.count / programsProps.pageSize));

    return (
        <ClientPageTitle dict={dict}>
            <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
                {renderTextWithFormatting(dict?.cooperation?.maintext)}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                    <button
                        type="button"
                        key={program.id}
                        onClick={() => router.push(`/${lang}/international-cooperation/${program.id}`)}
                        className="overflow-hidden rounded-lg border border-neutral-200 bg-white text-left transition hover:border-neutral-300 hover:shadow-sm"
                    >
                        <div className="aspect-video bg-neutral-100">
                            {program?.image ? (
                                <img src={program.image} alt="" className="h-full w-full object-cover" />
                            ) : null}
                        </div>
                        <div className="p-4">
                            <p className="font-semibold text-neutral-900">{program?.[`title_${lang}`]}</p>
                            <span className="mt-2 inline-block text-sm text-[var(--color-accent)]">
                                {dict?.blogAndNews?.titles?.aboutButton}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {pages > 1 && (
                <nav className="mt-10 flex justify-center gap-2">
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => handleChangePage(null, p)}
                            className={`h-9 min-w-[2.25rem] rounded-md border text-sm font-medium ${
                                p === programsProps.page
                                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </nav>
            )}
        </ClientPageTitle>
    );
};

export default InternatonalCooperation;