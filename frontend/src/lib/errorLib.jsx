function onError(error) {
	let message = error.toString();

	// TODO Auth errors need to check and change later
	if (!(error instanceof Error) && error.message) {
		message = error.message;
	}

	alert(message);
}

export default onError;
