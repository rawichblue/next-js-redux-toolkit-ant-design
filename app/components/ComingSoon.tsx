"use client";

type HeaderProps = {
  title: string;
};

export default function ComingSoon({ title }: HeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md h-28">
      <div className="ms-10 flex items-center  h-full">
        <span className="text-gray-400 font-bold">{title}</span>
      </div>
    </div>
  );
}
