import Link from "next/link";
import { useRouter } from "next/router";

export default function ProfileNavigatorElement({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const router = useRouter();

  return (
    <Link href={`${path}`}>
      <p
        className={`p-2 capitalize flex items-center gap-2 text-primary-text pb-8 ${
          router.asPath === path
            ? " font-bold border-b-2 border-primary-text  "
            : ""
        }`}
      >
        {" "}
        {title}{" "}
      </p>
    </Link>
  );
}
