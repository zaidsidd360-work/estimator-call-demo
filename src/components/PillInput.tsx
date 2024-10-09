import React, { useState } from "react";

interface PillInputProps {
	placeHolder: string;
	fieldName: string;
	formValues: Record<string, string>;
	setFormValues: React.Dispatch<
		React.SetStateAction<{
			name: string;
			email: string;
			phone: string;
		}>
	>;
	type?: string;
	pattern?: string;
	required?: boolean;
}

const PillInput: React.FC<PillInputProps> = ({
	placeHolder,
	fieldName,
	formValues,
	setFormValues,
	type = "text",
	pattern,
	required = false,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const currValue = formValues[fieldName];

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		if (currValue === "") {
			setIsFocused(false);
		}
	};

	return (
		<div className="relative w-full max-w-sm">
			<label
				className={`absolute ${
					fieldName === "phone" ? " left-[8rem]" : "left-4"
				} top-1/2 transform transition-all duration-200 ease-in-out ${
					isFocused || currValue
						? "-top-2 scale-90 translate-y-[-130%] text-gray-500 bg-white px-3 ml-2"
						: "text-gray-500 -translate-y-1/2"
				}`}
				htmlFor={fieldName}
			>
				{placeHolder}
			</label>
			<input
				id={fieldName}
				type={type}
				value={currValue}
				onChange={(e) =>
					setFormValues((prev) => ({
						...prev,
						[fieldName]: e.target.value,
					}))
				}
				onFocus={handleFocus}
				onBlur={handleBlur}
				pattern={pattern}
				required={required}
				className={`w-full py-2 ${
					fieldName === "phone" ? " pl-[8rem]" : "px-4"
				} bg-white border border-gray-300 rounded-full focus:outline-none 
					${isFocused && "border-gray-500"}
					${currValue && "border-gray-300"}
					[&:not(:placeholder-shown):not(:focus):invalid]:border-red-300`}
				placeholder=" "
			/>
		</div>
	);
};

export default PillInput;
