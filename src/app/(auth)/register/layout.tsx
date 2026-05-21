import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create a free Trackr account and start tracking your money in minutes.",
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
