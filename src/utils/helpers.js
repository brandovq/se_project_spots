export function setButtonText(btn, isLoading, loadingText = "Saving...") {
  if (!btn) {
    return;
  }

  if (isLoading) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = loadingText;
  } else {
    btn.textContent = btn.dataset.originalText || btn.textContent;
    delete btn.dataset.originalText;
  }
}
