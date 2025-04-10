// Function to hide the 'For you' tab
function hideForYouTab() {
  // Find the link (a tag) with role="tab" that contains a span with the text "For you"
  // This avoids relying on potentially changing nav aria-labels.
  const xPath = "//a[@role='tab'][.//span[contains(normalize-space(.), 'For you')]]";
  const result = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const tabLink = result.singleNodeValue;

  if (tabLink) {
    // The element to hide is likely the direct parent of the link
    const elementToHide = tabLink.parentElement;
    if (elementToHide) {
      // Hide the parent element
      elementToHide.style.display = 'none';
      // console.log("Parent element of 'For you' link hidden via broader XPath."); // Commented out
    } else {
      // console.log("Found 'For you' link via broader XPath, but couldn't find its parent element."); // Commented out
    }
  } else {
    // console.log("Could not find 'For you' link/tab using broader XPath (//a[@role='tab'][.//span[contains(., 'For you')]])."); // Commented out
  }
}

// Use MutationObserver to handle dynamic content loading
const observer = new MutationObserver((mutationsList, observer) => {
    // Re-run the hiding logic whenever nodes are added/removed in the body
    // This is necessary as X.com dynamically loads content.
    hideForYouTab();
});

// Start observing the document body for added nodes and subtree modifications
observer.observe(document.body, { childList: true, subtree: true });

// Initial attempt to hide in case the elements are already present
hideForYouTab(); 