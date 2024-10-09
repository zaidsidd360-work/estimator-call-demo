import { useEffect, useState } from "react";
import "./App.css";
import PillInput from "./components/PillInput";

const agents = [
	{
		agentId: "AG001",
		name: "Clark",
		imgUrl: "https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/66dfb1e00c4a573703fde325_Firefly%20a%20agent%20who%20is%20calling%20in%20the%20call%20office%2Cthe%20office%20has%20a%20high%20celling%2011683-p-800.jpg",
		type: "Receptionist",
		bgBlobColors: {
			"bg-blob-a": "#fffb00", // Bright Yellow
			"bg-blob-b": "#daff33", // Light Yellow-Green
			"bg-blob-c": "#d3ff80", // Soft Green
		},
	},
	{
		agentId: "AG002",
		name: "Jane",
		imgUrl: "https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/66d7ab4f7cf6461383ff4842_Firefly%20a%20customer%20service%20agent%20is%20working%20in%20a%20call%20center%2038667.jpg",
		type: "Customer service",
		bgBlobColors: {
			"bg-blob-a": "#00ffd1", // Aqua
			"bg-blob-b": "#33ffe0", // Light Turquoise
			"bg-blob-c": "#80ffe6", // Pale Mint
		},
	},
	{
		agentId: "AG003",
		name: "Michelle",
		imgUrl: "https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/66d7a2feade3d854233990ea_Firefly%20a%20real%20estate%20agent%20is%20calling%20people%20to%20set%20appointments%2072036.jpg",
		type: "Appointment booking",
		bgBlobColors: {
			"bg-blob-a": "#ffb347", // Soft Orange
			"bg-blob-b": "#ffcc80", // Peach
			"bg-blob-c": "#ffe0b2", // Light Cream
		},
	},
];

function App() {
	const [selectedAgent, setSelectedAgent] = useState<{
		agentId: string;
		name: string;
		imgUrl: string;
		bgBlobColors: Record<string, string>;
	}>(agents[0]);

	const [formValues, setFormValues] = useState<{
		name: string;
		email: string;
		phone: string;
	}>({
		name: "",
		email: "",
		phone: "",
	});

	const setBgColors = (colors: { [x: string]: string | null }) => {
		const root = document.documentElement; // Targets the :root (html)
		Object.keys(colors).forEach((key) => {
			root.style.setProperty(`--${key}`, colors[key]);
		});
	};

	useEffect(() => {
		setBgColors(selectedAgent.bgBlobColors);
	}, [selectedAgent]);

	return (
		<div className="flex items-center justify-center h-screen w-full">
			<div className="w-[90vw] h-screen">
				<div className="flex flex-col items-start sm:flex-row gap-2 my-5">
					<div className="text-nowrap">Select an agent:</div>
					<div className="gap-2 flex flex-col items-start md:flex-row">
						{agents.map((agent) => (
							<div
								onClick={() => setSelectedAgent(agent)}
								key={agent.agentId}
								className={`border border-black px-2 py-1 rounded-full text-nowrap cursor-pointer ${
									selectedAgent.agentId === agent.agentId
										? `bg-black text-white border border-${agent.bgBlobColors["bg-blob-b"]}`
										: ""
								}`}
							>
								{agent.name} ({agent.type})
							</div>
						))}
					</div>
				</div>
				<div className="rounded-xl h-min overflow-hidden border border-gray-300">
					<form className="h-full px-2 py-2 space-y-3 relative">
						<h1 className="text-[2rem] mb-8">
							Receive a live call from our agent
						</h1>

						<div className="pb-8">
							<label className=" text-xl" htmlFor="phone">
								Phone Number
							</label>
							<input
								className="w-full border border-gray-200 h-10 pl-2 active:outline-none active:border-2"
								type="phone"
								id="phone"
							/>
						</div>
						<div className="pb-8">
							<label className=" text-xl" htmlFor="name">
								Name
							</label>
							<input
								className="w-full border border-gray-200 h-10 pl-2 active:outline-none active:border-2"
								type="text"
								id="name"
							/>
						</div>
						<div className="pb-8">
							<label className=" text-xl" htmlFor="email">
								Email
							</label>
							<input
								className="w-full border border-gray-200 h-10 pl-2 active:outline-none active:border-2"
								type="mail"
								id="email"
							/>
						</div>
						<div className="bg-black text-white rounded-md grid place-items-center p-3 mt-auto">
							Call {selectedAgent.name}
						</div>
					</form>
					{/* <img
						className="h-full max-w-1/2 w-1/2"
						src={selectedAgent.imgUrl}
						alt={selectedAgent.name}
					/> */}
					{/* <div className="container">
						<div className="absolute font-bold text-[4rem] left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
							Scallio AI
							<p>{selectedAgent.name}</p>
						</div>
						<div className="blobs">
							<div className="blob a">a</div>
							<div className="blob b">b</div>
							<div className="blob c">c</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default App;
