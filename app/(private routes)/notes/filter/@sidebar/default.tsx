import { fetchTagList } from "@/lib/api/clientApi"
import css from "./SidebarNotes.module.css"
import Link from "next/link";
import { NoteTag } from "@/types/note";

const SidebarNotes = async () => {
    const tags:NoteTag[] = await fetchTagList();

    return (
        <div>
            <ul className={css.menuList}>
                 <li className={css.menuItem}>
                    <Link href="/notes/filter/all" className={css.menuLink}>
                      All Notes
                    </Link>
        </li>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>))}
    </ul>
    </div>);
}

export default SidebarNotes;