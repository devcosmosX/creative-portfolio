"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectRowProps {
  index: number;
  title: string;
  category: string;
  url: string;
  setModal: React.Dispatch<React.SetStateAction<{ active: boolean; index: number }>>;
}

export default function ProjectRow({ index, title, category, url, setModal }: ProjectRowProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="group flex w-full items-center justify-between border-t border-white/5 py-12 px-4 transition-all duration-500 hover:opacity-100 hover:bg-white/[0.02]"
    >
      <div className="flex flex-col gap-2 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight group-hover:-translate-x-2 transition-transform duration-500">
          {title}
        </h2>
        <p className="text-white/40 font-mono tracking-widest uppercase text-xs group-hover:translate-x-2 transition-transform duration-500 delay-75">
          {category}
        </p>
      </div>

      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 pointer-events-none -rotate-45 group-hover:rotate-0">
        <ArrowUpRight className="w-5 h-5" />
      </div>
    </Link>
  );
}
