pageflow.browser.feature('vr view support', function(has) {
  return !pageflow.browser.agent.matchesMobileSafari() &&
    !pageflow.browser.agent.matchesIEUpTo11();
});
