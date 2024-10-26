import Link from "next/link";

interface SideBarItemProps {
  active: boolean;
  icon: string;
  path: string;
  title: string;
  key: string;
}

export const SideBarItem = (props: SideBarItemProps) => {
  const { active = false, icon, path, title} = props;

  return (
    <ul className="side-menu top">
      <li className={active? 'active': ''}>
        <Link href={path}>
          <i className={"bx bxs-" + icon}></i>
          <span className="text">{title}</span>
        </Link>
      </li>
    </ul>
  );
};
