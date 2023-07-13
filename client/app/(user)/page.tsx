import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import "../../css/pages/home.css";

export default function Home() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Loading></Loading>
    </Suspense>
  );
}
