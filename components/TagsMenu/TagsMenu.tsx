'use client';

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchTagList } from "@/lib/api/clientApi";
import type { NoteTag } from "@/types/note";
import Link from "next/link";

import css from "./TagsMenu.module.css";


function TagsMenu () {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  
   const { data: tags = [] } = useQuery<NoteTag[]>({
    queryKey: ["tags"],
    queryFn: fetchTagList,
   });
  
   useEffect(() => {
     setIsOpen(false);
   }, [pathname]);
  
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

   const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  
  
  return (
    <div className={css.menuContainer} ref={menuRef}>
     <button type="button" className={css.menuButton} onClick={toggleMenu}>
       Notes ▾
      </button>
     <ul className={`${css.menuList} ${isOpen ? css.menuOpen : ""}`}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}  onClick={() => setIsOpen(false)}>
            All Notes
          </Link>
        </li>
        {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
          >
              {tag}
          </Link>
        </li>
        ))}
     </ul>
   </div>
  );
}

export default TagsMenu;