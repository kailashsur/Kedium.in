function ProfileTogle({ isOpen }) {
  return (
    <div
      className={`absolute right-5 h-auto w-[264px] rounded-sm transition-opacity transform duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } p-6 shadow-md `}
      style={{ top: "40px" }}
    >
      this is togle box item
    </div>
  );
}

export default ProfileTogle;
