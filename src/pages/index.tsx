import React from "react";
import { trpc } from "../utils/trpc";

export default function Home() {
	const { data, isLoading } = trpc.useQuery(["get-all-todos"]);
	console.log({ data });
	return <div className="p-6 min-h-screen w-screen items-stretch relative">hello</div>;
}
