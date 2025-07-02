import { getZeroTrustRules } from "./lib/api.js";
import { notifyWebhook } from "./lib/utils.js";

const { result: rules } = await getZeroTrustRules();
//const cgpsRules = rules.filter(({ name }) => name.startsWith("CGPS Filter Lists"));

(async () => {
  if (!rules.length) {
    console.warn(
      "No rule(s) found."
    );
    return;
  }

  for (const rule of rules) {
    console.log(`Deleting rule ${cgpsRule.name}...`);
    await deleteZeroTrustRule(cgpsRule.id);
  }
})();

// Send a notification to the webhook
await notifyWebhook("Report rules (policies) CloudFlare");
