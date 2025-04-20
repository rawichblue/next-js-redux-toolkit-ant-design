"use client";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <div className="bg-white rounded-b-2xl shadow-md h-28">
      <div className="ms-10 flex items-center  h-full">
        <span className="text-3xl font-bold">{title}</span>
      </div>
    </div>
  );
}
