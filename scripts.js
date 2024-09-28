function explore(pageUrl) {
    // Check if the URL is an external URL
    if (pageUrl.startsWith("http://") || pageUrl.startsWith("https://")) {
        // Open the external URL in a new tab
        window.open(pageUrl, "_blank");
    } else {
        // Navigate to the internal URL
        window.location.href = pageUrl;
    }
}
