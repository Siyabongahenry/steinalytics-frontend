// config/vipCodes.js
export const VIP_CODES = {
  WEEKDAY: {
    DAY: {
      normal: { code: 100, label: "Normal weekday hours" },
      overtime: { code: 601, label: "Weekday overtime" },
    },
    NIGHT: {
      normal: { code: 700, label: "Night shift hours" },
      overtime: { code: 801, label: "Night shift overtime" },
    },
  },

  FRIDAY: {
    DAY: {
      normal: { code: 100, label: "Normal Friday hours" },
      overtime: { code: 601, label: "Friday overtime" },
    },
    NIGHT: {
      normal: { code: 700, label: "Friday night hours" },
      overtime: { code: 801, label: "Friday night overtime" },
    },
  },

  SATURDAY: {
    DAY: { all: { code: 601, label: "Saturday overtime (day shift)" } },
    NIGHT:{ all: { code: 801, label: "Saturday overtime (night shift)" } },
  },

  SUNDAY: {
    DAY: { all: { code: 602, label: "Sunday work (day shift)" } },
    NIGHT:{ all: { code: 802, label: "Sunday work (night shift)" } },
  },

  HOLIDAY: {
    DAY: {
      normal: { code: 603, label: "Holiday normal worked" },
      overtime: { code: 604, label: "Holiday overtime" },
    },
    NIGHT: {
      normal: { code: 803, label: "Holiday night normal worked" },
      overtime: { code: 804, label: "Holiday night overtime" },
    },
  },
};
