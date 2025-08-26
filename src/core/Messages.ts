export const successes = {
	allDataRetrieved: "All data retrieved successfully",
	allDataDeleted: "All data deleted successfully",
	dataCreated: "Data created successfully",
	dataRetrieved: "Data retrieved successfully",
	dataUpdated: "Data updated successfully",
	dataDeleted: "Data deleted successfully",
	tokenAuthenticated: "Token authenticated successfully",
	accountVerified: "The user account has been verified successfully.",
	verificationEmailSent: "The verification email has been sent successfully.",
	passwordEmailSent: "The password reset email has been sent successfully.",
	passwordReset: "The password has been reset successfully.",
	passwordChanged: "The password has been changed successfully.",
	signInSuccess: "Signed in successfully",
	userValidated: "User validated successfully",
	logoutSuccess: "Logged out successfully",
	loginSuccess: "Logged in successfully",
	accessTokenValid: "The access token is valid",
	passwordResetLinkSent: "Password reset link sent successfully",
	passwordResetSuccess: "Password reset successful"
};

export const errors = {
	// Required Errors
	nameIsRequired: "Name is required",
	emailIsRequired: "Email address is required",
	passwordIsRequired: "Password is required",
	confirmPasswordIsRequired: "Confirm Password is required",
	phoneIsRequired: "Phone number is required",
	passwordRequired: "Password is required",
	newPasswordRequired: "New Password is required",
	confirmPasswordRequired: "Confirm Password is required",
	totalAmountIsRequired: "Total amount is required",
	descriptionIsRequired: "Description is required",
	fieldIsRequired: "This field is required",
	roleIsRequired: "Role is required",
	tokenIsRequired: "Token is required",
	methodIsRequired: "Method is required",
	categoryIsRequired: "Category is required",
	categoryImageIsRequired: "Category image is required",
	branchNameIsRequired: "Branch name is required",
	addressIsRequired: "Branch address is required",
	openingTimeIsRequired: "Branch opening time is required",
	closingTimeIsRequired: "Branch closing time is required",
	locationLinkIsRequired: "Branch location link is required",
	latitudeIsRequired: "Branch latitude is required",
	longitudeIsRequired: "Branch longitude is required",
	branchIdIsRequired: "Branch ID is required",
	imageRequired: "Image is required",
	// Validation Errors
	invalidEmail: "Provided email is invalid",
	passwordLengthMin: "Password must be at least 6 characters long",
	passwordOneUppercase: "Password must contain at least one uppercase letter",
	passwordOneLowercase: "Password must contain at least one lowercase letter",
	passwordOneNumeric: "Password must contain at least one number",
	passwordLengthMax: "Password can't be more than 32 characters",
	newPasswordLength: "New Password must be at least 6 characters",
	passwordsDidNotMatch: "Passwords don't match",
	quantityMustBeNumber: "Quantity must be a number",
	priceMustBeNumber: "Price must be a number",
	totalAmountMustBeNumber: "Total amount must be a number",
	fieldTypeMustBeString: "Field type must be a string",
	unauthorized: "Access to this resource is unauthorized.",
	userNotFound: "The specified user could not be found.",
	userDoesNotHavePassword: "The user does not have a password.",
	userAlreadyExists: "The user already exists.",
	userIsNotVerified: "The user account has not been verified.",
	invalidUserAccountId: "The user account ID provided is invalid.",
	invalidUser: "The user account is invalid.",
	invalidUserCredentials: "The provided user credentials are invalid.",
	invalidUserDetails: "The provided user details are invalid.",
	invalidToken: "The token provided is invalid.",
	oldPasswordNotMatch: "The old password does not match.",
	newPasswordCannotBeSame: "The new password cannot be the same as the old password.",
	internalServerError: "An internal server error occurred. Please try again later.",
	invalidTokenType: "The provided token type is invalid.",
	signInError: "An error occurred while signing in.",
	emailIsAlreadyAssociated: "Email is already associated with an account",
	oauthProviderError: "An error occurred while signing in with the OAuth provider",
	accountCreationError: "An error occurred while creating the account",
	logoutError: "An error occurred while logging out",
	tokenBlacklisted: "The token has been blacklisted",
	invalidVerificationToken: "The verification token is invalid",
	tokenExpired: "The token has expired",
	passwordMismatch: "The passwords do not match",
	invalidMethod: "The method provided is invalid",
	maxFileSizeExceeded: "The file size exceeds the maximum limit",
	validationError: "Data validation error",
	categoryAlreadyExists: "The category already exists",
	productAlreadyExists: "The product already exists",
	adminRequired: "Only an admin can perform this action",
	workerRequired: "Only a worker can perform this action",
	categoryIDDoesntExist: "The provided category ID do(es) not exist",
	dataNotFound: "The data could not be found",
	latitudeMustBeBetween: "Latitude must be between -90 and 90",
	longitudeMustBeBetween: "Longitude must be between -180 and 180",
	invalidPhoneNumber: "Invalid phone number",
	invalidData: "Invalid data provided",
	invalidPassword: "Invalid password"
};

export const authMessages = {
	success: {
		registration: "Registration successful. Welcome!",
		login: "Login successful. Welcome back!",
		logout: "Logout successful. See you again!",
		passwordReset: "Password reset successful. You can now log in with your new password.",
		emailVerification: "Email verification successful. Your account is now active.",
		accountVerification: "Account verification successful. Your account is active.",
		passwordChange: "Password change successful. Your password has been updated.",
		tokenRefresh: "Token refresh successful. You are still logged in.",
		tokenValid: "Token is valid. You are authenticated.",
		authorizationGranted: "Access granted. You have the necessary permissions.",
		emailVerificationSent: "Email verification sent. Please check your inbox.",
		otpRequestSent: "One-time password request sent. Please check your phone."
	},
	error: {
		registration: {
			emailInUse: "Registration failed. The email is already in use.",
			weakPassword: "Registration failed. The password is too weak.",
			invalidEmail: "Registration failed. The email address is invalid.",
			missingFields: "Registration failed. Please fill in all required fields.",
			serverError: "Registration failed. Server error occurred."
		},
		login: {
			invalidCredentials: "Login failed. Invalid email or password.",
			accountLocked: "Login failed. Your account is locked.",
			accountNotVerified: "Login failed. Please verify your email address.",
			missingFields: "Login failed. Please provide both email and password.",
			serverError: "Login failed. Server error occurred.",
			twoFactorRequired: "Login failed. Two-factor authentication is required.",
			twoFactorFailed: "Login failed. Two-factor authentication failed.",
			invalidOTP: "Login failed. Invalid one-time password."
		},
		logout: {
			notLoggedIn: "Logout failed. You are not logged in.",
			serverError: "Logout failed. Server error occurred."
		},
		passwordReset: {
			invalidToken: "Password reset failed. The reset token is invalid or expired.",
			userNotFound: "Password reset failed. No user found with this email address.",
			weakPassword: "Password reset failed. The new password is too weak.",
			serverError: "Password reset failed. Server error occurred."
		},
		emailVerification: {
			invalidToken: "Email verification failed. The verification token is invalid or expired.",
			alreadyVerified: "Email verification failed. The email is already verified.",
			serverError: "Email verification failed. Server error occurred."
		},
		passwordChange: {
			incorrectPassword: "Password change failed. The current password is incorrect.",
			weakNewPassword: "Password change failed. The new password is too weak.",
			serverError: "Password change failed. Server error occurred."
		},
		tokenRefresh: {
			invalidToken: "Token refresh failed. The refresh token is invalid or expired.",
			serverError: "Token refresh failed. Server error occurred."
		},
		authorization: {
			insufficientRole: "Access denied. You do not have the necessary role.",
			insufficientRoles: "Access denied. You do not have the necessary roles.",
			insufficientPermissions: "Access denied. You do not have the necessary permissions.",
			sessionExpired: "Access denied. Your session has expired.",
			notAuthenticated: "Access denied. You are not authenticated.",
			serverError: "Access denied. Server error occurred."
		}
	}
};

export const crudMessages = {
	success: {
		create: (item: string) => `${item} created successfully.`,
		read: (item: string) => `${item} retrieved successfully.`,
		update: (item: string) => `${item} updated successfully.`,
		delete: (item: string) => `${item} deleted successfully.`
	},
	error: {
		create: {
			validationError: (item: string) => `Creation of ${item} failed. Validation error occurred.`,
			alreadyExists: (item: string) => `Creation of ${item} failed. Item already exists.`,
			missingFields: (item: string) => `Creation of ${item} failed. Missing required fields.`,
			serverError: (item: string) => `Creation of ${item} failed. Server error occurred.`,
			duplicateEntry: (item: string) => `Creation of ${item} failed. Duplicate entry detected.`,
			invalidData: (item: string) => `Creation of ${item} failed. Invalid data provided.`,
			quotaExceeded: (item: string) => `Creation of ${item} failed. Quota exceeded.`
		},
		read: {
			notFound: (item: string) => `Retrieval of ${item} failed. Item not found.`,
			unauthorized: (item: string) =>
				`Retrieval of ${item} failed. You do not have the necessary permissions.`,
			serverError: (item: string) => `Retrieval of ${item} failed. Server error occurred.`,
			noData: (item: string) => `Retrieval of ${item} failed. No data available.`,
			forbidden: (item: string) => `Retrieval of ${item} failed. Forbidden access.`,
			timeout: (item: string) => `Retrieval of ${item} failed. Operation timed out.`
		},
		update: {
			notFound: (item: string) => `Update of ${item} failed. Item not found.`,
			validationError: (item: string) => `Update of ${item} failed. Validation error occurred.`,
			missingFields: (item: string) => `Update of ${item} failed. Missing required fields.`,
			serverError: (item: string) => `Update of ${item} failed. Server error occurred.`,
			conflict: (item: string) => `Update of ${item} failed. Conflict with existing data.`,
			unauthorized: (item: string) => `Update of ${item} failed. Unauthorized access.`,
			noChanges: (item: string) => `Update of ${item} failed. No changes detected.`,
			locked: (item: string) => `Update of ${item} failed. The item is locked.`
		},
		delete: {
			notFound: (item: string) => `Deletion of ${item} failed. Item not found.`,
			unauthorized: (item: string) =>
				`Deletion of ${item} failed. You do not have the necessary permissions.`,
			serverError: (item: string) => `Deletion of ${item} failed. Server error occurred.`,
			conflict: (item: string) => `Deletion of ${item} failed. Conflict with related data.`,
			protected: (item: string) => `Deletion of ${item} failed. Item is protected.`,
			dependencyError: (item: string) => `Deletion of ${item} failed. Dependency error occurred.`,
			timeout: (item: string) => `Deletion of ${item} failed. Operation timed out.`
		}
	}
};

export const zodMessages = {
	error: {
		required: {
			fieldIsRequired: (field: string) => `${field} is required.`
		},
		limit: {
			stringMin: (field: string, limit: number) => `${field} must be at least ${limit} characters.`,
			stringMax: (field: string, limit: number) => `${field} must not exceed ${limit} characters.`,
			arrayMin: (field: string, limit: number) => `${field} must have at least ${limit} items.`,
			arrayMax: (field: string, limit: number) => `${field} must not exceed ${limit} items.`,
			numberMin: (field: string, limit: number) => `${field} must be at least ${limit}.`,
			numberMax: (field: string, limit: number) => `${field} must not exceed ${limit}.`
		},
		invalid: {
			invalidUpperCase: (field: string) => `${field} must be at least one upper case.`,
			invalidLowerCase: (field: string) => `${field} must be at least one lower case.`,
			invalidNumericCase: (field: string) => `${field} must be at least one number.`,
			invalidUsernameOrEmail: (field: string) =>
				`${field} must be a valid username or email address.`,
			invalidUsername: (field: string) =>
				`${field} must contain only letters, numbers, and underscores.`,
			invalidEmail: (field: string) => `${field} must be a valid email address.`,
			invalidString: (field: string) => `${field} must be a string.`,
			invalidNumber: (field: string) => `${field} must be a number.`,
			invalidBoolean: (field: string) => `${field} must be a boolean.`,
			invalidDate: (field: string) => `${field} must be a date.`,
			invalidArray: (field: string) => `${field} must be an array.`,
			invalidObject: (field: string) => `${field} must be an object.`,
			invalidEnum: (field: string, values: string[]) =>
				`${field} must be one of the following values: ${values.join(", ")}.`,
			invalidUnion: (field: string) => `${field} must be one of the specified types.`,
			invalidIntersection: (field: string) =>
				`${field} must be a combination of the specified types.`,
			invalidTuple: (field: string) => `${field} must be a tuple.`,
			invalidRecord: (field: string) => `${field} must be a record.`,
			invalidLiteral: (field: string, value: string) =>
				`${field} must be the literal value: ${value}.`,
			invalidNull: (field: string) => `${field} must be null.`,
			invalidUndefined: (field: string) => `${field} must be undefined.`,
			invalidOptional: (field: string) => `${field} must be optional.`,
			invalidNullable: (field: string) => `${field} must be nullable.`,
			invalidPromise: (field: string) => `${field} must be a promise.`,
			invalidFunction: (field: string) => `${field} must be a function.`,
			invalidClass: (field: string) => `${field} must be a class.`,
			invalidUnknown: (field: string) => `${field} must be unknown.`,
			invalidNever: (field: string) => `${field} must be never.`,
			invalidVoid: (field: string) => `${field} must be void.`,
			invalidAny: (field: string) => `${field} must be any.`,
			invalidUnknownKeys: (field: string) => `${field} must have unknown keys.`,
			invalidFile: (field: string) => `${field} must be a file.`,
			invalidFileSize: (field: string, limit: number) => `${field} must not exceed ${limit} bytes.`,
			invalidFileType: (field: string, type: string) => `${field} must be of type ${type}.`,
			invalidPhoneNumber: (field: string) => `${field} must be a valid phone number.`
		}
	}
};
