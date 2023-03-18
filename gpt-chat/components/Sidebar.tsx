import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";
import { useRouter } from "next/router";

const sidebarItems = [
    {
      name: "Home",
      href: "/",
      icon: AiOutlineHome,
    },
    {
        name: "ChatGPT",
        href: "/chatgpt",
        icon: AiOutlineHome,
      },
    {
      name: "About",
      href: "/about",
      icon: BsPeople,
    },
    {
      name: "Mails",
      href: "/mails",
      icon: FiMail,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: TiContacts,
    },
  ];

export default function Sidebar() {
    const router = useRouter();
    const { isCollapsedSidebar, toogleSidebarCollapseHandler } = useContext(SidebarContext);

    return (
        <div className="sidebar__wrapper">
            <button className="btn" onClick={toogleSidebarCollapseHandler}>
                <MdOutlineKeyboardArrowLeft />
            </button>
            <aside className="sidebar" data-collapse={isCollapsedSidebar}>
                <div className="sidebar__top">
                    <Image
                        alt="logo"
                        src="/logo.png"
                        width={80}
                        height={80}
                        className="sidebar__logo"
                    />
                    <p className="sidebar__logo-name">ChatBot Aggregator</p>
                </div>
                <ul className="sidebar__list">
                    {sidebarItems.map( ({name, href, icon: Icon})=> {
                        return (
                            <li className="sidebar__item" key={name}>
                                <Link
                                    className={`sidebar__link ${
                                        router.pathname == href ? "sidebar__link--active" : ""
                                    }`}
                                    href={href}
                                >
                                <span
                                    className="sidebar__icon"
                                >
                                    <Icon />
                                </span>
                                <span
                                    className="sidebar__name"
                                >
                                    {name}
                                </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </aside>
        </div>
    )
}