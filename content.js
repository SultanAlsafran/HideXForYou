let hasClickedFollowing = false; // Flag to ensure we only click once per navigation

// Function to hide the 'For you' tab
function hideForYouTab() {
  // Updated: X.com now uses DIV elements with role="tab", not anchor tags
  // Find the div with role="tab" that contains "For you" text
  const xPath = "//div[@role='tab'][.//span[contains(normalize-space(.), 'For you')] or contains(normalize-space(.), 'For you')]";
  const result = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const tabDiv = result.singleNodeValue;

  if (tabDiv) {
    // The parent element has role="presentation" - hide that
    const elementToHide = tabDiv.parentElement;
    if (elementToHide) {
      elementToHide.style.display = 'none';
      // console.log("'For you' tab hidden successfully.");
    }
  }
}

// Function to find and click the 'Following' tab
function clickFollowingTab() {
  if (hasClickedFollowing) {
    return; // Don't click multiple times
  }

  // Updated: X.com now uses DIV elements with role="tab"
  const followingXPath = "//div[@role='tab'][.//span[contains(normalize-space(.), 'Following')] or contains(normalize-space(.), 'Following')]";
  const result = document.evaluate(followingXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const followingTabDiv = result.singleNodeValue;

  if (followingTabDiv) {
    // console.log("Found 'Following' tab, attempting click.");
    followingTabDiv.click();
    hasClickedFollowing = true;
    // console.log("'Following' tab clicked.");
  }
}

// Use MutationObserver to handle dynamic content loading
const observer = new MutationObserver((mutationsList, observer) => {
  hideForYouTab();
  if (!hasClickedFollowing) {
    clickFollowingTab();
  }
});

// Start observing the document body for added nodes and subtree modifications
observer.observe(document.body, { childList: true, subtree: true });

// Initial attempt to hide and click in case the elements are already present
hideForYouTab();
clickFollowingTab();