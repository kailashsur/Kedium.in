import Link from "next/link";
import { useRouter } from "next/router";

export default function SidebarElement({
  icon,
  title,
  path,
  colaps,
  setColaps,
}: {
  icon: JSX.Element;
  title: string;
  path: string;
  colaps: boolean;
  setColaps: Function;
}) {
  const router = useRouter();

  return (
    <Link href={path} onClick={() => setColaps(false)}>
      <p
        className={`p-2 flex items-center gap-2 ${
          router.asPath === path
            ? "bg-primary-background rounded-md text-primary-text shadow-sm"
            : ""
        }`}
      >
        {icon}
        <span className={`${colaps ? "sm:hidden" : "hidden sm:block"}`}>
          {title}
        </span>
      </p>
    </Link>
  );
}
