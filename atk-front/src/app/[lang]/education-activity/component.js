"use client"

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import React from "react";
import "./styles.css";
import { useParams } from "next/navigation";

const EducationActivity = ({ dict }) => {
  const { lang } = useParams();

  const renderTextWithFormatting = (text) => {
    if (!text) return null;

    return text.split("\n\n").map((block, blockIndex) => {
      const headerMatch = block.match(/^(#{1,6})\s(.+)/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const content = headerMatch[2].trim();
        const Tag = `h${level}`;
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

      if (block.startsWith("* ") || block.startsWith("- ")) {
        const items = block
          .split("\n")
          .map((line) => line.replace(/^[\*\-]\s*/, "").trim());
        return (
          <ul key={blockIndex} className="list-disc list-inside my-4">
            {items.map((item, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{
                  __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            ))}
          </ul>
        );
      }

      if (block.match(/^\d+\./)) {
        const items = block
          .split("\n")
          .map((line) => line.replace(/^\d+\./, "").trim());
        return (
          <ol key={blockIndex} className="list-decimal list-inside my-4">
            {items.map((item, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{
                  __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            ))}
          </ol>
        );
      }

      return (
        <p
          key={blockIndex}
          className="my-4"
          dangerouslySetInnerHTML={{
            __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
          }}
        />
      );
    });
  };

  return (
    <ClientPageTitle dict={dict}>
      <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 text-sm leading-relaxed text-neutral-800">
        {renderTextWithFormatting(dict?.educationActivity?.maintext)}
      </div>
    </ClientPageTitle>
  );
};

export default EducationActivity