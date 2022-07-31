javascript: fetch(
	location.href.replace("https://soundcloud.com/", "http://localhost:3000/"),
	{
		mode: "cors",
	}
);
