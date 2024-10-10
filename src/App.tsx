import { useEffect, useState } from "react";
import "./App.css";
import { Loader, Phone } from "lucide-react";
import parsePhoneNumber from "libphonenumber-js";
import { toast } from "react-toastify";

const agents = [
	{
		agentId: "0a7c9b72-b4e2-4036-aaa0-02757032f6b9",
		name: "Lucy",
		imgUrl: "https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/66dfb1e00c4a573703fde325_Firefly%20a%20agent%20who%20is%20calling%20in%20the%20call%20office%2Cthe%20office%20has%20a%20high%20celling%2011683-p-800.jpg",
		type: "Inbound QA",
		bgBlobColors: {
			"bg-blob-a": "#fffb00", // Bright Yellow
			"bg-blob-b": "#daff33", // Light Yellow-Green
			"bg-blob-c": "#d3ff80", // Soft Green
		},
	},
	{
		agentId: "a427db91-4195-44d6-8737-842a098ffcc7",
		name: "Alex",
		imgUrl: "https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/66d7ab4f7cf6461383ff4842_Firefly%20a%20customer%20service%20agent%20is%20working%20in%20a%20call%20center%2038667.jpg",
		type: "Customer Support",
		bgBlobColors: {
			"bg-blob-a": "#00ffd1", // Aqua
			"bg-blob-b": "#33ffe0", // Light Turquoise
			"bg-blob-c": "#80ffe6", // Pale Mint
		},
	},
	{
		agentId: "9a4f42a6-6e74-4d0b-9687-8bf9926b126f",
		name: "Maria",
		imgUrl: "https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/66d7a2feade3d854233990ea_Firefly%20a%20real%20estate%20agent%20is%20calling%20people%20to%20set%20appointments%2072036.jpg",
		type: "Appointment Setter",
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

	const [isCalling, setIsCalling] = useState(false);

	const handleCallAgent = async () => {
		if (formValues.name === "" || formValues.phone === "") {
			toast.error("Please provide your phone number and name");
			return;
		}
		if (!parsePhoneNumber(formValues.phone)?.isValid()) {
			toast.error("Please provide a valid phone number");
			return;
		}

		setIsCalling(true);

		const options = {
			method: "POST",
			headers: {
				Authorization: "Bearer 120d7b8c-a153-4d2f-99a1-6fde5ce680bf",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				assistantOverrides: {
					variableValues: {
						name: formValues.name,
						phone: formValues.phone,
						email: formValues.email,
					},
				},
				customer: {
					number: parsePhoneNumber(formValues.phone)?.number,
					name: formValues.name,
				},
				assistantId: selectedAgent.agentId,
				phoneNumberId: "a185ba6c-aca5-4eae-9320-caf6966d52df",
			}),
		};

		try {
			await fetch("https://api.vapi.ai/call", options)
				.then((response) => response.json())
				.then((response) => console.log(response))
				.catch((err) => console.error(err));
			console.log(`Calling ${selectedAgent.name}...`);
		} catch (error) {
			console.error("Failed to call the agent", error);
		} finally {
			setIsCalling(false); // Reset the calling state
		}
	};

	// const setBgColors = (colors: { [x: string]: string | null }) => {
	// 	const root = document.documentElement; // Targets the :root (html)
	// 	Object.keys(colors).forEach((key) => {
	// 		root.style.setProperty(`--${key}`, colors[key]);
	// 	});
	// };

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	console.log(parsePhoneNumber(formValues.phone)?.number);

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
					<form className="h-full flex flex-col px-2 py-2 space-y-3 relative">
						<h1 className="text-[2rem] mb-5">
							Receive a live call from our agent
						</h1>

						<div className="pb-8">
							<label className="text-xl" htmlFor="phone">
								Phone Number (with country code*)
							</label>
							<input
								required
								className="w-full border border-gray-200 h-10 pl-2 active:outline-none active:border-2"
								type="phone"
								id="phone"
								name="phone"
								placeholder="ex: +1 123 456 7890"
								onChange={handleChange}
							/>
						</div>

						<div className="pb-8">
							<label className="text-xl" htmlFor="name">
								Name
							</label>
							<input
								required
								className="w-full border border-gray-200 h-10 pl-2 active:outline-none active:border-2"
								type="text"
								id="name"
								name="name"
								placeholder="ex: John Doe"
								onChange={handleChange}
							/>
						</div>

						<div className="pb-8">
							<label className="text-xl" htmlFor="email">
								Email
							</label>
							<input
								className="w-full border border-gray-200 h-10 pl-2 active:outline-none active:border-2"
								type="mail"
								id="email"
								name="email"
								placeholder="ex: jdoe@example.com"
								onChange={handleChange}
							/>
						</div>

						{/* This div takes up the remaining space to push the button to the bottom */}
						<div className="flex-grow"></div>

						<div
							className={`bg-black text-white rounded-md grid place-items-center p-3 cursor-pointer ${
								isCalling ? "opacity-50 cursor-not-allowed" : ""
							}`}
							onClick={isCalling ? undefined : handleCallAgent}
							aria-disabled={isCalling}
						>
							{isCalling ? (
								<div className="flex items-center gap-2">
									<span>Calling {selectedAgent.name}...</span>
									<Loader
										size={20}
										className="animate-spin mr-2"
									/>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<span>Call {selectedAgent.name}</span>
									<Phone size={20} className="mr-2" />
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
