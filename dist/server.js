var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/collections/crm/Brands/index.ts
var Brands;
var init_Brands = __esm({
  "src/collections/crm/Brands/index.ts"() {
    "use strict";
    Brands = {
      slug: "brands",
      admin: {
        group: "CRM & Execution",
        useAsTitle: "brandName",
        defaultColumns: ["brandName", "healthStatus"]
      },
      access: {
        read: () => true
      },
      fields: [
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: {
            position: "sidebar",
            description: "URL-friendly unique slug for brand"
          }
        },
        {
          name: "brandName",
          type: "text",
          required: true
        },
        {
          type: "row",
          fields: [
            {
              name: "registeredPhone",
              type: "text",
              label: "Public Phone",
              required: true,
              admin: {
                placeholder: "+15551234567"
              }
            },
            {
              name: "supportEmail",
              type: "email",
              required: true,
              admin: {
                placeholder: "brand@example.com"
              }
            }
          ]
        },
        {
          name: "healthStatus",
          type: "select",
          options: ["Healthy", "Warning", "Suspended", "Banned", "Pending"],
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "emergencyHalt",
          type: "checkbox",
          defaultValue: false,
          admin: {
            position: "sidebar",
            description: "IF CHECKED, ALL API ACTIVITY FOR BRAND IS HALTED. Prevents spam/abuse and compromised API credentials"
          }
        }
      ]
    };
  }
});

// src/collections/crm/Conversations/index.ts
var Conversations;
var init_Conversations = __esm({
  "src/collections/crm/Conversations/index.ts"() {
    "use strict";
    Conversations = {
      slug: "lead-conversation",
      admin: {
        group: "CRM & Execution"
      },
      fields: [
        {
          name: "lead",
          type: "relationship",
          relationTo: "leads"
        },
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands"
        },
        {
          name: "summary",
          type: "textarea",
          admin: {
            description: "AI-updated TL;DR of the chat so far"
          }
        },
        {
          name: "lastIntent",
          type: "text",
          admin: {
            placeholder: "ie: Booking, Dispute"
          }
        },
        {
          name: "meta",
          type: "json"
        }
      ]
    };
  }
});

// src/collections/crm/LeadActivities.ts
var LeadActivity;
var init_LeadActivities = __esm({
  "src/collections/crm/LeadActivities.ts"() {
    "use strict";
    LeadActivity = {
      slug: "lead-activity",
      admin: {
        group: "CRM & Execution"
        // hidden: true,
      },
      fields: [
        {
          name: "lead",
          type: "relationship",
          relationTo: "leads"
        },
        {
          name: "type",
          type: "select",
          options: ["INBOUND_SMS", "OUTBOUND_SMS", "PHOTO_UPLOAD", "CALL", "STATUS_CHANGE"]
        },
        {
          name: "description",
          type: "textarea",
          required: true
        },
        {
          name: "referenceId",
          type: "text",
          admin: {
            description: "The ID of the specific document being referenced"
          }
        }
      ]
    };
  }
});

// src/collections/crm/LeadMedia/index.ts
var LeadMedia;
var init_LeadMedia = __esm({
  "src/collections/crm/LeadMedia/index.ts"() {
    "use strict";
    LeadMedia = {
      slug: "lead-media",
      upload: true,
      admin: {
        group: "CRM & Execution",
        defaultColumns: ["category"]
      },
      fields: [
        {
          name: "lead",
          type: "relationship",
          relationTo: "leads",
          required: true
        },
        {
          name: "location",
          type: "relationship",
          relationTo: "lead-locations",
          required: true
        },
        {
          name: "category",
          type: "select",
          options: ["PRE_SERVICE", "POST_SERVICE", "CONTRACT", "DAMAGE_DETAIL"]
        },
        {
          name: "aiAnalysis",
          type: "textarea"
        }
      ]
    };
  }
});

// src/collections/crm/Leads/index.tsx
var Leads;
var init_Leads = __esm({
  "src/collections/crm/Leads/index.tsx"() {
    "use strict";
    Leads = {
      slug: "leads",
      admin: {
        group: "CRM & Execution",
        useAsTitle: "phoneNumber",
        defaultColumns: ["firstName", "lastName", "phoneNumber"]
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "firstName",
              type: "text"
            },
            {
              name: "lastName",
              type: "text"
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "phoneNumber",
              type: "text",
              required: true,
              admin: {
                placeholder: "+15551234567"
              }
            },
            {
              name: "email",
              type: "email"
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "status",
              type: "select",
              options: ["LEAD", "CUSTOMER", "ARCHIVED", "OPTED_OUT"],
              defaultValue: "LEAD"
            },
            {
              name: "subStatus",
              type: "select",
              options: ["NEW", "APPT_SET", "JOB_IN_PROGRESS", "COMPLETED"],
              defaultValue: "NEW"
            }
          ]
        },
        {
          name: "metadata",
          type: "json"
        },
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          required: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "doNotCall",
          type: "checkbox",
          defaultValue: false
        }
      ]
    };
  }
});

// src/collections/crm/Locations/index.ts
var Locations;
var init_Locations = __esm({
  "src/collections/crm/Locations/index.ts"() {
    "use strict";
    Locations = {
      slug: "lead-locations",
      admin: {
        group: "CRM & Execution",
        useAsTitle: "streetAddress",
        defaultColumns: ["streetAddress", "locationType"]
      },
      fields: [
        {
          name: "lead",
          type: "relationship",
          relationTo: "leads",
          required: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          required: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "streetAddress",
          type: "text",
          required: true
        },
        {
          name: "city",
          type: "text",
          required: true
        },
        {
          name: "state",
          type: "text",
          required: true
        },
        {
          name: "zip",
          type: "text",
          required: true
        },
        {
          name: "locationType",
          type: "select",
          options: ["PRIMARY", "RENTAL", "BILLING"],
          required: true
        }
      ]
    };
  }
});

// src/collections/crm/NurtureState/index.ts
var NurtureState;
var init_NurtureState = __esm({
  "src/collections/crm/NurtureState/index.ts"() {
    "use strict";
    NurtureState = {
      slug: "nurture-state",
      admin: {
        group: "CRM & Execution"
      },
      fields: [
        {
          name: "lead",
          type: "relationship",
          relationTo: "leads",
          unique: true
        },
        {
          name: "lastSummary",
          type: "textarea",
          admin: {
            description: "AI-written current situation snapshot"
          }
        },
        {
          name: "nextStep",
          type: "text"
        },
        {
          name: "objections",
          type: "array",
          fields: [
            {
              name: "objection",
              type: "text"
            }
          ]
        }
      ]
    };
  }
});

// src/collections/crm/index.ts
var CrmCollections;
var init_crm = __esm({
  "src/collections/crm/index.ts"() {
    "use strict";
    init_Brands();
    init_Conversations();
    init_LeadActivities();
    init_LeadMedia();
    init_Leads();
    init_Locations();
    init_NurtureState();
    CrmCollections = [
      Brands,
      Leads,
      Conversations,
      LeadMedia,
      Locations,
      NurtureState,
      LeadActivity
    ];
  }
});

// src/lib/constants/tcr.ts
var TCR_BUSINESS_TYPES, TCR_VERTICALS, TCR_CAMPAIGN_STATUSES, TCR_BRAND_STATUSES;
var init_tcr = __esm({
  "src/lib/constants/tcr.ts"() {
    "use strict";
    TCR_BUSINESS_TYPES = [
      { label: "Private Corporation", value: "PRIVATE_PROFIT" },
      { label: "Public Corporation", value: "PUBLIC_PROFIT" },
      { label: "LLC", value: "LLC" },
      { label: "Partnership", value: "PARTNERSHIP" },
      { label: "Sole Proprietor", value: "SOLE_PROP" },
      { label: "Non-Profit", value: "NON_PROFIT" },
      { label: "Government", value: "GOVERNMENT" }
    ];
    TCR_VERTICALS = [
      { label: "Automotive", value: "AUTOMOTIVE" },
      { label: "Agriculture", value: "AGRICULTURE" },
      { label: "Communication", value: "COMMUNICATION" },
      { label: "Construction & Trade Services", value: "CONSTRUCTION" },
      { label: "Education", value: "EDUCATION" },
      { label: "Energy & Utilities", value: "ENERGY" },
      { label: "Entertainment", value: "ENTERTAINMENT" },
      { label: "Financial Services", value: "FINANCIAL" },
      { label: "Gambling / Gaming", value: "GAMBLING" },
      { label: "Healthcare & Life Sciences", value: "HEALTHCARE" },
      { label: "Hospitality & Travel", value: "HOSPITALITY" },
      { label: "Manufacturing", value: "MANUFACTURING" },
      { label: "Professional Services (Legal/CPA)", value: "PROFESSIONAL" },
      { label: "Real Estate", value: "REAL_ESTATE" },
      { label: "Retail & Consumer Products", value: "RETAIL" },
      { label: "Technology & IT", value: "TECHNOLOGY" },
      { label: "Transportation & Logistics", value: "TRANSPORTATION" },
      { label: "Political", value: "POLITICAL" }
    ];
    TCR_CAMPAIGN_STATUSES = [
      { label: "Active", value: "ACTIVE" },
      { label: "In Review", value: "IN_REVIEW" },
      { label: "Verified", value: "VERIFIED" },
      { label: "Failed / Rejected", value: "FAILED" },
      { label: "Suspended", value: "SUSPENDED" },
      { label: "Expired", value: "EXPIRED" }
    ];
    TCR_BRAND_STATUSES = [
      { label: "Pending", value: "PENDING" },
      { label: "Approved", value: "APPROVED" },
      { label: "Vetting In Progress", value: "VETTING_IN_PROGRESS" },
      { label: "Failed", value: "FAILED" },
      { label: "In Review", value: "IN_REVIEW" },
      { label: "Suspended", value: "SUSPENDED" },
      { label: "Expired", value: "EXPIRED" },
      { label: "Deleted", value: "DELETED" }
    ];
  }
});

// src/collections/compliance/BrandMetrics/index.ts
var BrandMetrics;
var init_BrandMetrics = __esm({
  "src/collections/compliance/BrandMetrics/index.ts"() {
    "use strict";
    init_tcr();
    BrandMetrics = {
      slug: "brand-metrics",
      admin: {
        useAsTitle: "tcrBrandId",
        defaultColumns: ["tcrBrandId", "brandStatus", "trustScore"],
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          required: true
        },
        {
          name: "tcrBrandId",
          type: "text",
          required: true,
          unique: true
        },
        {
          name: "tcrBrandScore",
          type: "text",
          required: true,
          label: "Official TCR ID"
        },
        {
          name: "brandStatus",
          type: "select",
          options: [...TCR_BRAND_STATUSES],
          defaultValue: "PENDING"
        },
        {
          name: "trustScore",
          type: "number",
          min: 0,
          max: 100,
          label: "Twilio Trust Score"
        },
        {
          name: "vettingClass",
          type: "number",
          label: "TCR Vetting Class",
          min: 1,
          max: 5,
          defaultValue: 1,
          admin: {
            step: 1
          }
        },
        {
          name: "tcrSubmissionSid",
          type: "text",
          required: true,
          unique: true
        },
        {
          name: "vettingError",
          type: "text"
        },
        {
          name: "optOutRate",
          type: "number",
          label: "Opt-Out Rate (Aggregated across campaigns)"
        }
      ]
    };
  }
});

// src/collections/compliance/BrandProfiles/index.ts
var BrandProfiles;
var init_BrandProfiles = __esm({
  "src/collections/compliance/BrandProfiles/index.ts"() {
    "use strict";
    init_tcr();
    BrandProfiles = {
      slug: "brand-profiles",
      admin: {
        useAsTitle: "legalBusinessName",
        defaultColumns: ["legalBusinessName", "websiteUrl"],
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          required: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          type: "row",
          fields: [
            {
              name: "legalBusinessName",
              type: "text",
              required: true,
              label: "Legal Entity Name"
            },
            {
              name: "taxId",
              type: "text",
              required: true,
              label: "EIN/TaxID",
              admin: {
                placeholder: "XX-XXXXXXX",
                description: "Exactly as shown on the CP-575 or 147C form"
              }
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "entityType",
              type: "select",
              required: true,
              label: "Entity Type",
              options: [...TCR_BUSINESS_TYPES]
            },
            {
              name: "vertical",
              type: "select",
              required: true,
              options: [...TCR_VERTICALS]
            }
          ]
        },
        {
          name: "streetAddress",
          type: "text",
          label: "Street Address",
          required: true,
          admin: {
            description: "Exactly as shown on IRS form"
          }
        },
        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              required: true
            },
            {
              name: "state",
              type: "text",
              required: true
            },
            {
              name: "zip",
              type: "text",
              required: true
            }
          ]
        },
        {
          name: "websiteUrl",
          type: "text",
          label: "Marketing Site URL"
        },
        {
          type: "collapsible",
          label: "Trust Hub Data",
          fields: [
            {
              type: "text",
              unique: true,
              name: "trustHubBundleSid"
            },
            {
              type: "select",
              required: true,
              name: "trustHubStatus",
              options: ["draft", "pending", "approved", "rejected"],
              defaultValue: "draft"
            },
            {
              type: "date",
              name: "lastVettingDate"
            },
            {
              type: "textarea",
              name: "complianceNotes"
            }
          ]
        }
      ]
    };
  }
});

// src/collections/compliance/CampaignCompliance/index.ts
var CampaignCompliance;
var init_CampaignCompliance = __esm({
  "src/collections/compliance/CampaignCompliance/index.ts"() {
    "use strict";
    CampaignCompliance = {
      slug: "campaign-compliance",
      admin: {
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "campaign",
          type: "relationship",
          relationTo: "campaigns"
        },
        {
          name: "tcrCampaignSid",
          type: "text",
          required: true,
          index: true
        },
        {
          name: "messagingServiceId",
          type: "text"
        }
      ]
    };
  }
});

// src/collections/compliance/Campaigns/index.ts
var Campaigns;
var init_Campaigns = __esm({
  "src/collections/compliance/Campaigns/index.ts"() {
    "use strict";
    init_tcr();
    Campaigns = {
      slug: "campaigns",
      admin: {
        useAsTitle: "campaignName",
        defaultColumns: ["campaignName", "campaignStatus"],
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "campaignName",
          type: "text",
          required: true,
          unique: true
        },
        {
          name: "tcrCampaignSid",
          type: "text",
          required: true,
          unique: true,
          index: true
        },
        {
          name: "campaignStatus",
          type: "select",
          options: [...TCR_CAMPAIGN_STATUSES],
          defaultValue: "IN_REVIEW",
          required: true,
          index: true
        },
        {
          name: "messagingServiceId",
          type: "text",
          required: true
        }
      ]
    };
  }
});

// src/collections/compliance/ConsentLogs/index.ts
var ConsentLogs;
var init_ConsentLogs = __esm({
  "src/collections/compliance/ConsentLogs/index.ts"() {
    "use strict";
    ConsentLogs = {
      slug: "consent-logs",
      admin: {
        useAsTitle: "phoneNumber",
        defaultColumns: ["phoneNumber", "type"],
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "phoneNumber",
          type: "text",
          required: true,
          index: true
        },
        {
          name: "type",
          type: "select",
          options: ["OPT_IN", "OPT_OUT"],
          required: true
        },
        {
          name: "source",
          type: "select",
          options: ["SMS_KEYWORD", "WEB_FORM", "MANUAL_ADMIN", "API_IMPORT"],
          required: true
        },
        {
          name: "consentDate",
          type: "date",
          defaultValue: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          name: "rawTextSnapshot",
          type: "textarea",
          required: true,
          admin: {
            description: "The exact message body"
          }
        },
        {
          name: "metadata",
          type: "json"
        },
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "proof",
          type: "relationship",
          relationTo: "sms-logs",
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "lookupKey",
          type: "text",
          required: true,
          admin: {
            hidden: true
          }
        }
      ]
    };
  }
});

// src/collections/compliance/Contracts/index.ts
var Contracts;
var init_Contracts = __esm({
  "src/collections/compliance/Contracts/index.ts"() {
    "use strict";
    Contracts = {
      slug: "contracts",
      admin: {
        defaultColumns: ["contractType", "signedDated"],
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "contractType",
          type: "select",
          options: ["MSA", "DPA", "BAA", "ADDENDUM"]
        },
        {
          name: "status",
          type: "select",
          options: ["DRAFT", "SENT", "SIGNED", "EXPIRED", "VOIDED"]
        },
        {
          type: "row",
          fields: [
            {
              name: "signedDate",
              type: "date"
            },
            {
              name: "signedByIp",
              type: "text"
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "signatureProvider",
              type: "select",
              options: ["DOCUSIGN", "PANDADOC", "INTERNAL"]
            },
            {
              name: "envelopeId",
              type: "text",
              index: true
            }
          ]
        },
        {
          name: "isPrimary",
          type: "checkbox",
          defaultValue: true,
          label: "IS Primary Contract"
        },
        {
          name: "fileAttachment",
          type: "upload",
          relationTo: "media"
        },
        {
          name: "metadata",
          type: "json"
        },
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "rateCard",
          type: "relationship",
          relationTo: "rate-cards",
          admin: {
            position: "sidebar"
          }
        }
      ]
    };
  }
});

// src/collections/compliance/OptInMethods/index.ts
var OptInMethods;
var init_OptInMethods = __esm({
  "src/collections/compliance/OptInMethods/index.ts"() {
    "use strict";
    OptInMethods = {
      slug: "optin-methods",
      admin: {
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "campaign",
          type: "relationship",
          relationTo: "campaigns"
        },
        {
          name: "type",
          type: "select",
          options: ["WEB", "KEYWORD", "VERBAL", "PAPER_FORM"]
        },
        {
          name: "proof",
          type: "upload",
          relationTo: "media"
        }
      ]
    };
  }
});

// src/collections/compliance/SmsConsent/index.ts
var SmsConsent;
var init_SmsConsent = __esm({
  "src/collections/compliance/SmsConsent/index.ts"() {
    "use strict";
    SmsConsent = {
      slug: "sms-consent",
      admin: {
        defaultColumns: ["id"],
        group: "Compliance & Legal"
      },
      fields: [
        {
          name: "smsLog",
          type: "relationship",
          relationTo: "sms-logs",
          required: true
        },
        {
          name: "body",
          type: "textarea",
          required: true
        }
      ]
    };
  }
});

// src/collections/compliance/index.ts
var ComplianceCollections;
var init_compliance = __esm({
  "src/collections/compliance/index.ts"() {
    "use strict";
    init_BrandMetrics();
    init_BrandProfiles();
    init_CampaignCompliance();
    init_Campaigns();
    init_ConsentLogs();
    init_Contracts();
    init_OptInMethods();
    init_SmsConsent();
    ComplianceCollections = [
      BrandProfiles,
      CampaignCompliance,
      ConsentLogs,
      OptInMethods,
      BrandMetrics,
      Contracts,
      SmsConsent,
      Campaigns
    ];
  }
});

// src/collections/communication/ProviderConfigs/index.ts
var ProviderConfigs;
var init_ProviderConfigs = __esm({
  "src/collections/communication/ProviderConfigs/index.ts"() {
    "use strict";
    ProviderConfigs = {
      slug: "provider-configs",
      admin: {
        group: "Communication Infrastructure",
        defaultColumns: ["twilioSubAccountSid", "gcpQuotaTier"],
        useAsTitle: "twilioSubAccountSid"
      },
      fields: [
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          required: true
        },
        {
          name: "twilioSubAccountSid",
          type: "text",
          required: true,
          unique: true
        },
        {
          name: "twilioAuthToken",
          type: "text"
        },
        {
          name: "gcpProjectId",
          type: "text",
          required: true,
          unique: true
        },
        {
          name: "gcpProjectNumber",
          type: "text"
        },
        {
          name: "gcpApiKey",
          type: "text"
        },
        {
          name: "gcpServiceAccountEmail",
          type: "text"
        },
        {
          name: "gcpProjectStatus",
          type: "select",
          options: ["PROVISIONING", "ACTIVE", "SUSPENDED", "ERROR"],
          defaultValue: "PROVISIONING"
        },
        {
          name: "gcpSpendBudgetCap",
          label: "Google Cloud Spend Cap (Cents)",
          type: "number",
          defaultValue: 5e3
        },
        {
          name: "gcpQuotaTier",
          type: "select",
          options: ["HIGH", "LOW"],
          defaultValue: "HIGH"
        }
      ]
    };
  }
});

// src/collections/communication/SmsLogs/index.ts
var SmsLogs;
var init_SmsLogs = __esm({
  "src/collections/communication/SmsLogs/index.ts"() {
    "use strict";
    SmsLogs = {
      slug: "sms-logs",
      admin: {
        group: "Communication Infrastructure",
        defaultColumns: ["messageSid", "from", "to", "direction"],
        useAsTitle: "messageSid"
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "messageSid",
              type: "text",
              unique: true,
              required: true
            },
            {
              name: "direction",
              type: "select",
              options: ["INBOUND", "OUTBOUND_API"]
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "from",
              required: true,
              type: "text",
              admin: {
                placeholder: 'E.164 (e.g.: "+1...")'
              }
            },
            {
              name: "to",
              required: true,
              type: "text",
              admin: {
                placeholder: 'E.164 (e.g.: "+1...")'
              }
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "segments",
              type: "number"
            },
            {
              name: "totalCost",
              type: "number"
            }
          ]
        },
        {
          name: "body",
          type: "textarea"
        },
        {
          name: "status",
          type: "select",
          options: ["QUEUED", "SENT", "DELIVERED", "FAILED", "UNDELIVERABLE"],
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "campaign",
          type: "relationship",
          relationTo: "campaigns",
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "sent_at",
          type: "date",
          label: "Sent At",
          admin: {
            position: "sidebar"
          }
        }
      ]
    };
  }
});

// src/collections/communication/TwilioNumbers/index.ts
var TwilioNumbers;
var init_TwilioNumbers = __esm({
  "src/collections/communication/TwilioNumbers/index.ts"() {
    "use strict";
    TwilioNumbers = {
      slug: "twilio-numbers",
      admin: {
        group: "Communication Infrastructure",
        useAsTitle: "phoneNumber",
        defaultColumns: ["label", "phoneNumber", "status"]
      },
      fields: [
        {
          name: "phoneNumber",
          type: "text",
          required: true,
          unique: true,
          admin: {
            description: 'E.164 (e.g.: "+15551234567")'
          }
        },
        {
          name: "twilioNumberSid",
          type: "text",
          required: true,
          unique: true
        },
        {
          name: "campaign",
          type: "relationship",
          relationTo: "campaigns"
        },
        {
          name: "status",
          type: "select",
          options: ["ACTIVE", "PENDING_TRANSFER", "RELEASED"],
          required: true
        },
        {
          name: "capabilities",
          type: "select",
          options: ["SMS", "MMS", "VOICE"],
          hasMany: true
        },
        {
          name: "label",
          type: "text",
          required: true,
          admin: {
            placeholder: "Unique Human-Readable Label"
          }
        }
      ]
    };
  }
});

// src/collections/communication/VoiceLogs/index.ts
var VoiceLogs;
var init_VoiceLogs = __esm({
  "src/collections/communication/VoiceLogs/index.ts"() {
    "use strict";
    VoiceLogs = {
      slug: "voice-logs",
      admin: {
        group: "Communication Infrastructure",
        defaultColumns: ["callSid", "direction"],
        useAsTitle: "callSid"
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "callSid",
              type: "text",
              unique: true,
              required: true
            },
            {
              name: "direction",
              type: "select",
              options: ["INBOUND", "OUTBOUND_API"]
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "from",
              type: "text"
            },
            {
              name: "to",
              type: "text"
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "callType",
              type: "select",
              options: ["AI_ASSISTANT", "HUMAN_TO_HUMAN"]
            },
            {
              name: "status",
              type: "select",
              options: ["RINGING", "IN_PROGRESS", "COMPLETED", "BUSY", "FAILED"]
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "duration",
              type: "number",
              admin: {
                description: "Call duration in seconds"
              }
            },
            {
              name: "usageCost",
              type: "number",
              label: "usage Cost (In Cents)"
            }
          ]
        },
        {
          name: "campaign",
          type: "relationship",
          relationTo: "campaigns",
          admin: {
            position: "sidebar"
          }
        }
      ]
    };
  }
});

// src/collections/communication/index.ts
var CommunicationCollections;
var init_communication = __esm({
  "src/collections/communication/index.ts"() {
    "use strict";
    init_ProviderConfigs();
    init_SmsLogs();
    init_TwilioNumbers();
    init_VoiceLogs();
    CommunicationCollections = [ProviderConfigs, SmsLogs, TwilioNumbers, VoiceLogs];
  }
});

// src/collections/operations/Invoices/index.ts
var Invoices;
var init_Invoices = __esm({
  "src/collections/operations/Invoices/index.ts"() {
    "use strict";
    Invoices = {
      slug: "invoices",
      admin: {
        group: "Operations & Billing",
        useAsTitle: "invoiceNumber"
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "brand",
              type: "relationship",
              relationTo: "brands",
              required: true,
              admin: {
                description: "Keeps the link to the owner."
              }
            },
            {
              name: "invoiceNumber",
              type: "text",
              required: true,
              unique: true,
              admin: {
                description: "Unique ID for accounting"
              }
            }
          ]
        },
        {
          name: "billingPeriod",
          type: "group",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "start",
                  type: "date",
                  required: true
                },
                {
                  name: "end",
                  type: "date",
                  required: true
                }
              ]
            }
          ]
        },
        {
          name: "usageSnapshot",
          type: "json",
          required: true,
          admin: {
            description: "Store the final counts (e.g., 502 mins, 1000 sms) so you don't need the Ledger"
          }
        },
        {
          type: "row",
          fields: [
            {
              name: "subtotal",
              type: "number",
              required: true,
              admin: {
                description: "Base Fee (in cents)"
              }
            },
            {
              name: "overageAmount",
              type: "number",
              required: true,
              admin: {
                description: "Total overages (in cents)"
              }
            },
            {
              name: "totalAmount",
              type: "number",
              required: true,
              admin: {
                description: "The final sum (Base + Overages + Fines)"
              }
            }
          ]
        },
        {
          name: "paymentStatus",
          type: "select",
          required: true,
          defaultValue: "UNPAID",
          options: [
            { label: "Unpaid", value: "UNPAID" },
            { label: "Paid", value: "PAID" },
            { label: "Void", value: "VOID" },
            { label: "Refunded", value: "REFUNDED" }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "stripeInvoiceId",
              type: "text",
              index: true,
              admin: {
                description: "Index this. Essential for webhook lookups"
              }
            },
            {
              name: "stripeInvoiceUrl",
              type: "text",
              admin: {
                description: "Direct link to Stripe's hosted PDF"
              }
            }
          ]
        }
      ]
    };
  }
});

// src/collections/operations/RateCards/index.ts
var RateCards;
var init_RateCards = __esm({
  "src/collections/operations/RateCards/index.ts"() {
    "use strict";
    RateCards = {
      slug: "rate-cards",
      admin: {
        group: "Operations & Billing",
        useAsTitle: "name"
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              unique: true,
              admin: {
                description: 'Unique name (e.g., "2026 Enterprise Tier")'
              }
            },
            {
              name: "isDefault",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description: "For automatic provisioning."
              }
            }
          ]
        },
        {
          name: "baseMonthly",
          type: "number",
          required: true,
          admin: {
            description: "Charge: Monthly subscription fee"
          }
        },
        {
          type: "row",
          fields: [
            {
              name: "includedMinutes",
              type: "number",
              required: true,
              admin: {
                description: "Voice minutes per month"
              }
            },
            {
              name: "includedSMS",
              type: "number",
              required: true,
              admin: {
                description: "SMS segments per month"
              }
            },
            {
              name: "includedAITokens",
              type: "number",
              required: true,
              admin: {
                description: "AI Tokens per month"
              }
            }
          ]
        },
        {
          label: "Voice Rates",
          type: "collapsible",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "overageRateMin",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Charge: What customer pays after quota"
                  }
                },
                {
                  name: "costPerMin",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Cost: What Twilio/Carrier charges US"
                  }
                }
              ]
            }
          ]
        },
        {
          label: "SMS Rates",
          type: "collapsible",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "overageRateSMS",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Charge: What customer pays after quota"
                  }
                },
                {
                  name: "costPerSMS",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Cost: What Twilio/Carrier charges US"
                  }
                }
              ]
            }
          ]
        },
        {
          label: "AI & Processing Rates",
          type: "collapsible",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "aiTokenRate",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Charge: Customer price per 1k tokens."
                  }
                },
                {
                  name: "costPerToken",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Cost: What Google/AI provider charges US"
                  }
                }
              ]
            },
            {
              type: "row",
              fields: [
                {
                  name: "transcriptRate",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Charge: Price for post-call processing"
                  }
                },
                {
                  name: "recordingRate",
                  type: "number",
                  required: true,
                  admin: {
                    description: "Charge: Storage fee for audio"
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  }
});

// src/collections/operations/Subscriptions/index.ts
var Subscriptions;
var init_Subscriptions = __esm({
  "src/collections/operations/Subscriptions/index.ts"() {
    "use strict";
    Subscriptions = {
      slug: "subscriptions",
      admin: {
        group: "Operations & Billing"
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "brand",
              type: "relationship",
              relationTo: "brands",
              // Ensure this matches your Brands collection slug
              required: true,
              admin: {
                description: "Who owns this?"
              }
            },
            {
              name: "rateCard",
              type: "relationship",
              relationTo: "rate-cards",
              required: true,
              admin: {
                description: "The Link: Which prices do we use?"
              }
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "ACTIVE",
              options: [
                { label: "Active", value: "ACTIVE" },
                { label: "Past Due", value: "PAST_DUE" },
                { label: "Canceled", value: "CANCELED" }
              ]
            },
            {
              name: "currentPeriodEnd",
              type: "date",
              required: true,
              admin: {
                description: 'When do the "Included Quotas" reset?',
                date: {
                  pickerAppearance: "dayAndTime"
                }
              }
            }
          ]
        }
      ]
    };
  }
});

// src/collections/operations/UsageEvents/index.ts
var UsageEvents;
var init_UsageEvents = __esm({
  "src/collections/operations/UsageEvents/index.ts"() {
    "use strict";
    UsageEvents = {
      slug: "usage-events",
      admin: {
        group: "Operations & Billing"
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "operationType",
              type: "select",
              options: ["SMS", "VOICE", "AI_TOKEN"]
            },
            {
              name: "eventRef",
              type: "text",
              admin: {
                description: "The Twilio SID of the even (messageSid or callSid)"
              }
            }
          ]
        },
        {
          name: "brandId",
          type: "text"
        },
        {
          type: "row",
          fields: [
            {
              name: "rawQuantity",
              type: "number"
            },
            {
              name: "unitPrice",
              type: "number"
            },
            {
              name: "totalCents",
              type: "number"
            }
          ]
        },
        {
          name: "description",
          type: "textarea"
        }
      ]
    };
  }
});

// src/collections/operations/index.ts
var OperationsCollections;
var init_operations = __esm({
  "src/collections/operations/index.ts"() {
    "use strict";
    init_Invoices();
    init_RateCards();
    init_Subscriptions();
    init_UsageEvents();
    OperationsCollections = [Invoices, RateCards, Subscriptions, UsageEvents];
  }
});

// src/collections/Users.ts
var Users;
var init_Users = __esm({
  "src/collections/Users.ts"() {
    "use strict";
    Users = {
      slug: "users",
      admin: {
        group: "Operations & Billing",
        useAsTitle: "email"
      },
      auth: true,
      fields: [
        {
          name: "role",
          type: "select",
          options: ["ADMIN", "BRAND_MANAGER"]
        }
      ]
    };
  }
});

// src/collections/Media.ts
var Media;
var init_Media = __esm({
  "src/collections/Media.ts"() {
    "use strict";
    Media = {
      slug: "media",
      admin: {
        group: "Operations & Billing"
      },
      access: {
        read: () => true
      },
      fields: [
        {
          name: "alt",
          type: "text",
          required: true
        }
      ],
      upload: true
    };
  }
});

// src/lib/constants/ai.ts
var AI_TONE_OPTIONS, AI_KNOWLEDGE_BASE_CATEGORIES, AI_SENTIMENTS, AI_INTENTS;
var init_ai = __esm({
  "src/lib/constants/ai.ts"() {
    "use strict";
    AI_TONE_OPTIONS = [
      { label: "Friendly", value: "FRIENDLY" },
      { label: "SALES-Y", value: "SALESY" },
      { label: "PROFESSIONAL", value: "PROFESSIONAL" }
    ];
    AI_KNOWLEDGE_BASE_CATEGORIES = [
      { label: "General", value: "GENERAL" },
      { label: "Pricing", value: "PRICING" },
      { label: "Policy", value: "POLICY" },
      { label: "Area", value: "AREA" }
    ];
    AI_SENTIMENTS = [
      { label: "Positive", value: "POSITIVE" },
      { label: "Neutral", value: "NEUTRAL" },
      { label: "Negative", value: "NEGATIVE" },
      { label: "Frustrated", value: "FRUSTRATED" }
    ];
    AI_INTENTS = [
      { label: "Inquiry", value: "INQUIRY" },
      { label: "Complaint", value: "COMPLAINT" },
      { label: "Booking", value: "BOOKING" },
      { label: "Support", value: "SUPPORT" },
      { label: "Spam", value: "SPAM" }
    ];
  }
});

// src/collections/AiInsights/AiInsights/index.ts
var AiInsights;
var init_AiInsights = __esm({
  "src/collections/AiInsights/AiInsights/index.ts"() {
    "use strict";
    init_ai();
    AiInsights = {
      slug: "ai-insights",
      admin: {
        group: "AI & Insights"
      },
      fields: [
        {
          name: "voiceLog",
          type: "relationship",
          relationTo: "voice-logs",
          unique: true,
          required: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "summary",
          type: "textarea",
          maxLength: 180,
          admin: {
            description: "180-char max wrap-up of the call"
          }
        },
        {
          name: "sentiment",
          type: "select",
          options: [...AI_SENTIMENTS],
          defaultValue: "NEUTRAL"
        },
        {
          name: "intent",
          type: "select",
          options: [...AI_INTENTS]
        },
        {
          name: "extractedData",
          type: "json"
        },
        {
          name: "nextStep",
          type: "textarea",
          admin: {
            description: "Bulleted list of AI's estimated next steps based on intent of call"
          }
        },
        {
          name: "confidenceScore",
          type: "number",
          min: 0,
          max: 1,
          admin: {
            step: 0.01,
            description: "Gemini's Confidence in this analysis (from 0.00 to 1.00)"
          }
        }
      ]
    };
  }
});

// src/collections/AiInsights/KnowledgeBase/index.ts
var KnowledgeBase;
var init_KnowledgeBase = __esm({
  "src/collections/AiInsights/KnowledgeBase/index.ts"() {
    "use strict";
    init_ai();
    KnowledgeBase = {
      slug: "knowledge-base",
      admin: {
        group: "AI & Insights",
        useAsTitle: "title",
        defaultColumns: ["title", "category"]
      },
      fields: [
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          required: true,
          unique: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "title",
          type: "text",
          required: true
        },
        {
          name: "category",
          type: "select",
          options: [...AI_KNOWLEDGE_BASE_CATEGORIES],
          defaultValue: "GENERAL"
        },
        {
          name: "content",
          type: "textarea"
        },
        {
          name: "embedding",
          type: "json",
          admin: {
            hidden: true,
            description: "Stores the Vector from Gemini"
          }
        },
        {
          name: "isAutoGenerated",
          type: "checkbox",
          admin: {
            position: "sidebar",
            description: "Tracks if this resource came from the Learning Loop."
          }
        }
      ]
    };
  }
});

// src/collections/AiInsights/LearningQueue/index.ts
var LearningQueue;
var init_LearningQueue = __esm({
  "src/collections/AiInsights/LearningQueue/index.ts"() {
    "use strict";
    LearningQueue = {
      slug: "learning-queue",
      admin: {
        group: "AI & Insights"
      },
      fields: [
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          unique: true,
          required: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "detectedFact",
          type: "textarea",
          admin: {
            description: 'Example: "We now offer solar roofing"'
          }
        },
        {
          name: "sourceMessage",
          type: "textarea",
          admin: {
            description: "The text context that triggered the new fact"
          }
        },
        {
          name: "confidence",
          type: "number",
          min: 0,
          max: 100,
          admin: {
            step: 1,
            description: `AI's certainty that this is a "new fact".`
          }
        }
      ]
    };
  }
});

// src/collections/AiInsights/Personas/index.ts
var Personas;
var init_Personas = __esm({
  "src/collections/AiInsights/Personas/index.ts"() {
    "use strict";
    init_ai();
    Personas = {
      slug: "personas",
      admin: {
        group: "AI & Insights",
        useAsTitle: "agentName",
        defaultColumns: ["agentName", "tone", "createdAt"]
      },
      fields: [
        {
          name: "brand",
          type: "relationship",
          relationTo: "brands",
          unique: true
        },
        {
          name: "agentName",
          type: "text",
          required: true,
          defaultValue: "Kai"
        },
        {
          name: "systemPrompt",
          type: "textarea",
          required: true
        },
        {
          name: "tone",
          type: "select",
          options: [...AI_TONE_OPTIONS],
          required: true,
          defaultValue: "FRIENDLY"
        },
        {
          name: "baseContext",
          type: "richText"
        },
        {
          name: "signature",
          type: "text",
          admin: {
            description: "How the Agent always ends every text"
          }
        }
      ]
    };
  }
});

// src/collections/AiInsights/Transcriptions/index.ts
var Transcriptions;
var init_Transcriptions = __esm({
  "src/collections/AiInsights/Transcriptions/index.ts"() {
    "use strict";
    Transcriptions = {
      slug: "transcriptions",
      admin: {
        group: "AI & Insights",
        useAsTitle: "speaker"
      },
      fields: [
        {
          name: "voiceLog",
          type: "relationship",
          relationTo: "voice-logs",
          index: true,
          admin: {
            position: "sidebar"
          }
        },
        {
          name: "speaker",
          type: "select",
          options: ["AI_ASSISTANT", "LEAD", "REPRESENTATIVE"]
        },
        {
          name: "textContent",
          type: "textarea"
        },
        {
          name: "timestamp",
          type: "number",
          admin: {
            position: "sidebar",
            description: "Offset (in MS) in the conversation for seeking"
          }
        },
        {
          name: "isLive",
          type: "checkbox",
          admin: {
            position: "sidebar",
            description: "Distinguish real-time data from batch data"
          }
        },
        {
          name: "turnNumber",
          type: "number",
          required: true,
          defaultValue: 1
        }
      ]
    };
  }
});

// src/collections/AiInsights/index.ts
var AiInsightsCollections;
var init_AiInsights2 = __esm({
  "src/collections/AiInsights/index.ts"() {
    "use strict";
    init_AiInsights();
    init_KnowledgeBase();
    init_LearningQueue();
    init_Personas();
    init_Transcriptions();
    AiInsightsCollections = [
      AiInsights,
      KnowledgeBase,
      LearningQueue,
      Personas,
      Transcriptions
    ];
  }
});

// src/collections/index.ts
var collections;
var init_collections = __esm({
  "src/collections/index.ts"() {
    "use strict";
    init_crm();
    init_compliance();
    init_communication();
    init_operations();
    init_Users();
    init_Media();
    init_AiInsights2();
    collections = [
      ...CommunicationCollections,
      ...ComplianceCollections,
      ...CrmCollections,
      ...OperationsCollections,
      ...AiInsightsCollections,
      Users,
      Media
    ];
  }
});

// src/payload.config.ts
var payload_config_exports = {};
__export(payload_config_exports, {
  default: () => payload_config_default
});
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
var filename, dirname, payload_config_default;
var init_payload_config = __esm({
  "src/payload.config.ts"() {
    "use strict";
    init_collections();
    init_Users();
    filename = fileURLToPath(import.meta.url);
    dirname = path.dirname(filename);
    payload_config_default = buildConfig({
      admin: {
        user: Users.slug,
        importMap: {
          baseDir: path.resolve(dirname)
        }
      },
      collections,
      editor: lexicalEditor(),
      secret: process.env.PAYLOAD_SECRET || "",
      typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts")
      },
      db: postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URL || ""
        }
      }),
      sharp,
      plugins: []
    });
  }
});

// src/server.ts
import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";
import { WebSocketServer } from "ws";

// src/services/twilio/relayHandler.ts
async function handleRelayConnection(socket, payload) {
  let session = {
    voiceLogId: null,
    systemPrompt: null,
    turn: 1
  };
  socket.on("message", async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      switch (msg.type) {
        case "setup":
          session.voiceLogId = msg.customParameters?.voiceLogId;
          session.systemPrompt = msg.customParameters?.systemPrompt;
          console.log(`Relay Setup for Log ID: ${session.voiceLogId}`);
          break;
        case "prompt":
          console.log(`\u{1F3A4} User said: ${msg.voicePrompt}`);
          const aiResponse = "I can hear you! Your voice is being processed by the new relay.";
          socket.send(
            JSON.stringify({
              type: "text",
              token: aiResponse,
              last: true
              // Tells Twilio the AI is finished speaking
            })
          );
          if (session.voiceLogId) {
            payload.create({
              collection: "transcriptions",
              data: {
                voiceLog: session.voiceLogId,
                speaker: "AI_ASSISTANT",
                textContent: aiResponse,
                turnNumber: session.turn++
              }
            }).catch((e) => console.error("DB Logging failed:", e));
          }
          break;
        case "terminate":
          console.log("Twilio terminated the call session.");
          socket.close();
          break;
        case "interrupt":
          console.log("User interrupted the AI.");
          break;
      }
    } catch (err) {
      console.error("RELAY PROCESSING ERROR:", err);
    }
  });
  socket.on("close", (code) => {
    console.log(`[RELAY] Socket Closed. Code: ${code}`);
  });
}

// src/services/payload/getPayloadClient.ts
import { getPayload } from "payload";
var cachedPayload = global.payload;
if (!cachedPayload) {
  cachedPayload = global.payload = { client: null, promise: null };
}
async function getPayloadClient() {
  if (cachedPayload.client) return cachedPayload.client;
  if (!cachedPayload.promise) {
    cachedPayload.promise = (async () => {
      const configModule = await Promise.resolve().then(() => (init_payload_config(), payload_config_exports));
      const config = await configModule.default;
      return getPayload({ config });
    })();
  }
  try {
    cachedPayload.client = await cachedPayload.promise;
  } catch (err) {
    cachedPayload.promise = null;
    throw err;
  }
  return cachedPayload.client;
}

// src/server.ts
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev });
var handle = app.getRequestHandler();
app.prepare().then(async () => {
  const payload = await getPayloadClient();
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  const wss = new WebSocketServer({ noServer: true });
  server.on("upgrade", (req, socket, head) => {
    const { pathname } = parse(req.url || "", true);
    if (pathname === "/api/voice/stream") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        const s = socket;
        if (typeof s.setNoDelay === "function") s.setNoDelay(true);
        if (typeof s.setKeepAlive === "function") s.setKeepAlive(true, 5e3);
        handleRelayConnection(ws, payload);
      });
    } else {
      if (!dev) socket.destroy();
    }
  });
  const PORT = parseInt(process.env.PORT || "3000", 10);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
