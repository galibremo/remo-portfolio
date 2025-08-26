import bcrypt from "bcryptjs";
import collect from "collect.js";
import { StylesConfig } from "react-select";

import { errors } from "@/core/Messages";
import { ServiceResponse, status } from "@/core/ServiceApi";

export function numberWithCommas(x: number | string) {
	if (typeof x === "string") {
		return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}

export function throwIf(condition: any, error: any) {
	if (condition) {
		throw new Error(error);
	}

	return false;
}

export const FETCH_STATUS = {
	IDLE: "IDLE",
	LOADING: "LOADING",
	SUCCESS: "SUCCESS",
	ERROR: "ERROR"
};

export const siteTitle = "Aurora Appetites - A Celestial Dining Experience";
export const siteDescription =
	"A celestial dining experience where every bite is a taste of the stars.";

export function generateName(length: number): string {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let randomName = "";

	for (let i = 0; i < length - 8; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomName += characters.charAt(randomIndex);
	}

	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

	return currentDate + randomName;
}

export function truncateWords(inputString: string, maxLength: number) {
	// Split the string into an array of words
	const words = inputString.split(/\s+/);

	// Get the first 'maxLength' words
	const truncatedWords = words.slice(0, maxLength);

	// Join the words back into a string
	let truncatedString = truncatedWords.join(" ");

	// Append ellipsis if the original string is longer than 'maxLength' words
	if (words.length > maxLength) {
		truncatedString += "...";
	}

	return truncatedString;
}

export function truncateString(inputString: string, maxLength: number): string {
	if (inputString.length <= maxLength) {
		return inputString;
	}
	return inputString.slice(0, maxLength) + "...";
}

export function generateUniqueCode(
	prefix?: string,
	year?: number,
	allowedCharacters?: string
): string {
	const defaultAllowedCharactersToUse =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const allowedCharactersToUse = allowedCharacters || defaultAllowedCharactersToUse;
	const uniquePartLength = 6; // Adjust for desired length of unique part

	let uniqueCode = "";

	// Generate random alphanumeric characters
	for (let i = 0; i < uniquePartLength; i++) {
		uniqueCode += allowedCharactersToUse.charAt(
			Math.floor(Math.random() * allowedCharactersToUse.length)
		);
	}

	// Return formatted code
	return `${prefix || ""}_${year || new Date().getFullYear()}_${uniqueCode}`;
}

export const generateToken = (): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let token = "";
	for (let i = 0; i < 40; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	const saltRounds = 10;
	const hashedToken = bcrypt.hashSync(token, saltRounds);
	return hashedToken;
};

export const generateExpirationTime = (days: number): Date => {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date;
};

export const generateOTP = (digits: number): string => {
	const characters = "0123456789";
	let otp = "";
	for (let i = 0; i < digits; i++) {
		otp += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return otp;
};

export const generateOTPExpirationTime = (time: number): Date => {
	const date = new Date();
	date.setMinutes(date.getMinutes() + time);
	return date;
};

export function serverSideFormData(data: any) {
	const formDataObject: { [key: string]: any } = {};
	data.forEach((value: any, key: string) => {
		try {
			formDataObject[key] = JSON.parse(data.getAll(`${key}`));
		} catch (error) {
			formDataObject[key] = data.getAll(`${key}`);
		}
	});

	return formDataObject;
}

export function clientSideFormData(data: any) {
	const formData = new FormData();
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			if ((data as any)[key] instanceof FileList) {
				for (const file of (data as any)[key]) {
					formData.append(key, file);
				}
			} else {
				formData.append(key, JSON.stringify((data as any)[key]));
			}
		}
	}

	return formData;
}

export function convertToTaxAmount(price: number, percentage: number): number {
	return (price * percentage) / 100;
}

export function compareArrays(previousArray: number[], newArray: number[]) {
	const previousCollection = collect(previousArray);
	const newCollection = collect(newArray);

	const removedArray = previousCollection.diff(newCollection).all();
	const addedArray = newCollection.diff(previousCollection).all();

	return { removedArray, addedArray };
}

export function slugify(name: string) {
	return name
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "");
}

export async function getApiError(error: any) {
	console.log("Error:", error.message);
	if (error.status) return Promise.reject(error);
	return Promise.reject(
		ServiceResponse.createResponse(
			errors.internalServerError,
			status.HTTP_500_INTERNAL_SERVER_ERROR
		)
	);
}

export const SelectStyles: StylesConfig = {
	valueContainer: styles => ({
		...styles,
		padding: "0.35rem 0.75rem",
		fontSize: "0.875rem",
		lineHeight: "1.25rem"
	}),
	placeholder: styles => ({
		...styles,
		fontSize: "0.875rem",
		lineHeight: "1.25rem"
	}),
	indicatorSeparator: styles => ({
		...styles,
		display: "none"
	}),
	control: (provided, state) => ({
		...provided,
		transition: "all 0.3s ease-in-out",
		borderColor: "hsl(var(--input))",
		borderRadius: "calc(var(--radius) - 2px)",
		"&:hover": {
			borderColor: "hsl(var(--input))",
			cursor: "pointer"
		},
		"&:focus-within": {
			borderColor: "hsl(var(--input))",
			boxShadow: `0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring))`
		}
	}),
	container: (provided, state) => ({
		...provided,
		"&:focus-visible": {
			borderColor: "hsl(var(--input))",
			boxShadow: `0 0 0 2px hsl(var(--ring))`
		}
	}),
	menu: (provided, state) => ({
		...provided,
		"&:hover": {
			borderColor: "hsl(var(--input))",
			cursor: "pointer"
		}
	}),
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? "white" : "black",
		"&:hover": {
			borderColor: "hsl(var(--input))",
			cursor: "pointer"
		}
	})
};

export function generateBranchTime(): { label: string; value: string }[] {
	const times: { label: string; value: string }[] = [];
	const formatTime = (hour: number, minute: number): string => {
		const h = hour < 10 ? `0${hour}` : `${hour}`;
		const m = minute < 10 ? `0${minute}` : `${minute}`;
		return `${h}:${m}:00`;
	};

	const formatLabel = (hour: number, minute: number): string => {
		const period = hour < 12 ? "AM" : "PM";
		const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
		const h = formattedHour < 10 ? `0${formattedHour}` : `${formattedHour}`;
		const m = minute < 10 ? `0${minute}` : `${minute}`;
		return `${h}:${m} ${period}`;
	};

	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			times.push({
				label: formatLabel(hour, minute),
				value: formatTime(hour, minute)
			});
		}
	}

	return times;
}

export function convertTo12HourFormat(time24: string): string {
	// Split the input time into hours and minutes
	const [hourStr, minute] = time24.split(":");
	const hour = parseInt(hourStr, 10);

	// Determine the AM/PM suffix
	const suffix = hour >= 12 ? "PM" : "AM";

	// Convert the hour from 24-hour format to 12-hour format
	const hour12 = hour % 12 === 0 ? 12 : hour % 12;

	// Return the formatted time
	return `${hour12}:${minute} ${suffix}`;
}

export function convertTimestampToAmPm(timestamp: number) {
	const date = new Date(timestamp);

	// Extract hours, minutes, and seconds
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// Determine AM or PM suffix
	const ampm = hours >= 12 ? "PM" : "AM";

	// Convert hours from 24-hour format to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // Handle case where hour is 0

	// Format minutes and seconds to always have two digits
	const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
	const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

	// Combine into final time string
	const timeString = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

	return timeString;
}

export function capitalizeFirstLetter(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatToTwoDecimalPlaces(value: number, decimalPoint: number = 2) {
	return Number(value.toFixed(decimalPoint));
}

export function isEmptyObject<T extends object>(obj: T | null | undefined): boolean {
	return !!obj && Object.keys(obj).length === 0;
}
