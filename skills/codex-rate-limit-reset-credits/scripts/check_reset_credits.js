#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const authPath = path.join(os.homedir(), ".codex", "auth.json");
const endpoint = "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits";

function formatLocalTime(value, timeZone) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const getPart = (type) => parts.find((part) => part.type === type)?.value;
  const timeZoneName =
    new Intl.DateTimeFormat("en-AU", {
      timeZone,
      timeZoneName: "short",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value || timeZone;

  return `${getPart("year")}-${getPart("month")}-${getPart("day")} ${getPart("hour")}:${getPart("minute")}:${getPart("second")} ${timeZoneName}`;
}

function writeSafeResult(result) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

async function main() {
  const auth = JSON.parse(fs.readFileSync(authPath, "utf8"));
  const token = auth?.tokens?.access_token;

  if (!token) {
    writeSafeResult({
      ok: false,
      status: null,
      error: "Access token not found",
    });
    return;
  }

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (response.status === 401) {
    writeSafeResult({
      ok: false,
      status: 401,
      error: "Unauthorized",
    });
    return;
  }

  if (!response.ok) {
    writeSafeResult({
      ok: false,
      status: response.status,
      error: response.statusText || "Request failed",
    });
    return;
  }

  const data = await response.json();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const credits = Array.isArray(data?.credits) ? data.credits : [];

  writeSafeResult({
    ok: true,
    status: response.status,
    localTimeZone: timeZone,
    available_count: data?.available_count ?? null,
    credits: credits.map((credit) => ({
      status: credit?.status ?? null,
      title: credit?.title ?? null,
      granted_at: formatLocalTime(credit?.granted_at, timeZone),
      expires_at: formatLocalTime(credit?.expires_at, timeZone),
    })),
  });
}

main().catch((error) => {
  writeSafeResult({
    ok: false,
    status: null,
    error: error?.message || "Request failed",
  });
});
