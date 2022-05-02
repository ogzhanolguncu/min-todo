import { trpc } from "../utils/trpc";

export default function IndexPage() {
	const hello = trpc.useQuery(["hello"]);
	if (!hello.data) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<p>{hello.data.greeting}</p>
		</div>
	);
}
