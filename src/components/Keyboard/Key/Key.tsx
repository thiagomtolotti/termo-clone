"use client";
import Image from "next/image";
import styles from "./Key.module.css";
interface KeyProps {
  children: string;
}

export const Key = ({ children }: KeyProps) => {
  const handleClick = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: String(children) })
    );
  };

  return (
    <div
      className={`flex justify-center items-center bg-brown-300 col-span-3 rounded-lg font-bold text-xl py-3`}
      id={`${styles[String(children).toLowerCase()] ?? ""}`}
      onClick={handleClick}
    >
      {children === "Backspace" ? (
        <Image src="/img/backspace_icon.svg" width={24} height={24} alt="" />
      ) : (
        children
      )}
    </div>
  );
};
