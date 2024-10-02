import BlueTick from "./ui/BlueTick";

export default function Username({
  username,
  verified,
}: {
  username: String | undefined;
  verified: Boolean | undefined;
}) {
  return (
    <p className="text-primary-text text-sm flex items-center gap-1">
      @{username}
      {
        // Verified Badge
        verified && <BlueTick />
      }
    </p>
  );
}
