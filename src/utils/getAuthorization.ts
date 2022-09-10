function getAuthorization(): { code: string; error: string } | null {
  const queryString = window.location.search;
  let code = null;
  let error = null;
  if (queryString.length > 0) {
    const params = new URLSearchParams(queryString);
    code = params.get("code");
    error = params.get("error");
  } else {
    return null;
  }

  if (code) {
    return { code, error: "no error" };
  } else if (error) {
    return { code: "no code", error };
  } else {
    return null;
  }
}

export default getAuthorization;
