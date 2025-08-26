import { NextResponse } from "next/server";

class ApiResponse {
	static success(message: string = "", data: any = "") {
		if (data === null || data === "" || data === undefined) {
			return this.json({ success: true, message }, { status: 200 });
		} else {
			return this.json({ success: true, message, data }, { status: 200 });
		}
	}

	static error(message: string | null = null, e?: any) {
		return this.json(
			{
				success: false,
				message: message || e?.message
			},
			{ status: 500 }
		);
	}

	static created(message: string = "Date created successfully", data: any = "") {
		return this.json({ success: true, message, data }, { status: 201 });
	}

	static deleted(message: string = "Date deleted successfully", data: any = "") {
		return this.json({ success: true, message, data }, { status: 204 });
	}

	static badRequest(message: string = "Data already exists") {
		return this.json({ success: false, message }, { status: 403 });
	}

	static unauthorized(message: string = "Unauthorized Access") {
		return this.json({ success: false, message: message }, { status: 401 });
	}

	static notFound(message: string = "Not Found") {
		return this.json({ success: false, error: message }, { status: 404 });
	}

	static validationError(message: string = "Validation Error", errors?: any) {
		return this.json({ success: false, message, errors }, { status: 406 });
	}

	static json(body: any, options: any) {
		return NextResponse.json(body, options);
	}
}

export default ApiResponse;
