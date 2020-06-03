export const verifyUrl = (
  url: string,
  defaultUrl?: string
): string | undefined => {
  try {
    new URL(url)
    // If no exception was thrown, URL is valid
    return url
  } catch (e) {
    // URL is invalid if we cannot create an URL object
    return defaultUrl
  }
}
