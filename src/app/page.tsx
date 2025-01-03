import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <h1>
      This is my landing page (unprotected)
      <Link href={"/dashboard"}>dashboard</Link>
    </h1>
  );
}
