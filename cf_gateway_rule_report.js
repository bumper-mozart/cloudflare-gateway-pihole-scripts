import { getZeroTrustRules } from "./lib/api.js";
import { getZeroTrustLists } from "./lib/api.js";
import { notifyWebhook } from "./lib/utils.js";

const { result: rules } = await getZeroTrustRules();
//const cgpsRules = rules.filter(({ name }) => name.startsWith("CGPS Filter Lists"));

(async () => {
  if (!rules.length) {
    console.warn(
      "No rule found."
    );
    return;
  }

  for (const rule of rules) {
    console.log(`${rule.name}:`, rule);
  }
})();

// Send a notification to the webhook
await notifyWebhook("Report rules (policies) CloudFlare");
