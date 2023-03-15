import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md"

export default function Sidebar() {
    return (
        <div>
            <aside className="sidebar">
                <div>
                    <Image
                        alt="logo"
                        src="/logo.jpg"
                        width={80}
                        height={80}
                        className="sidebar__logo"
                    />
                </div>
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <Link href="/" className="sidebar__link">
                            <div className="sidebar_icon">
                                <MdDashboard />
                            </div>
                                <span>
                                    Dashboard
                                </span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    )
}