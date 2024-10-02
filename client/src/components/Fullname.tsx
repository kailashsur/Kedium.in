import BlueTick from "./ui/BlueTick";

export default function Fullname({
  fullname,
  verified = false,
}: {
  fullname: String | undefined;
  verified: Boolean | undefined;
}) {
  return (
    <div className=" flex items-center gap-1">
      {fullname}
      {
        // Verified Badge
        verified && <BlueTick />
      }
    </div>
  );
}
