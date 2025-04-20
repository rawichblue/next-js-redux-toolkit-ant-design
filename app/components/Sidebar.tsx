"use client";

import { SettingOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const handleGoHome = () => router.push("/");
  const handleGoToA = () => router.push("/email");
  const handleGoSettings = () => router.push("/settings");

  const iconClass = (activePath: string) =>
    `${pathname === activePath ? "border-e-4 border-yellow-500" : ""}`;

  return (
    <>
      <div className="bg-[#5B7FE1] h-full w-full rounded-full relative">
        <div className="flex-col flex items-center justify-center w-full gap-2 ">
          <div>
            <div className="rounded-full w-10 h-10 bg-gray-400 mt-2"></div>
          </div>

          <div
            className={`w-full flex justify-center items-center h-10 cursor-pointer  hover:bg-[#5176dd] transition-transform ${iconClass(
              "/"
            )}`}
          >
            <div onClick={handleGoHome}>
              <Image
                src="/image/monney.png"
                width={40}
                height={40}
                alt="เพิ่มพนักงาน"
              />
            </div>
          </div>

          <div
            className={`w-full flex justify-center items-center h-10 cursor-pointer  hover:bg-[#5176dd] transition-transform ${iconClass(
              "/email"
            )}`}
          >
            <div onClick={handleGoToA}>
              <Image
                src="/image/mail.png"
                width={40}
                height={40}
                alt="เพิ่มพนักงาน"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 w-full">
          <div
            className={`w-full flex justify-center items-center h-10 cursor-pointer  hover:bg-[#5176dd] transition-transform ${iconClass(
              "/settings"
            )}`}
          >
            <div onClick={handleGoSettings}>
              <SettingOutlined style={{ fontSize: "18px", color: "#fff" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
