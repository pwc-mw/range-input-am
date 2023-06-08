export default {
  editor: {
    label: { fr: "Range Input", en: "Range Input" },
  },
  triggerEvents: [
    {
      name: "change",
      label: { en: "On change" },
      event: { value: "" },
      default: true,
    },
    {
      name: "initValueChange",
      label: { en: "On init value change" },
      event: { value: "" },
    },
  ],
  properties: {
    value: {
      label: {
        en: "Init value",
      },
      type: "Number",
      options: (content) => ({ min: 0, max: content.max }),
      section: "settings",
      bindable: true,
      defaultValue: 0,
    },
    required: {
      label: { en: "Required", fr: "Requis" },
      type: "OnOff",
      defaultValue: true,
      bindable: true,
    },
    min: {
      label: { en: "Min range", fr: "Min range" },
      type: "Number",
      options: { min: 0, max: 1000 },
      defaultValue: 0,
      bindable: true,
    },
    max: {
      label: { en: "Max range", fr: "Max range" },
      type: "Number",
      options: { min: 1, max: 1000 },
      defaultValue: 100,
      bindable: true,
    },
    step: {
      label: { en: "Step", fr: "Step" },
      type: "Number",
      options: { min: 1, max: 100 },
      defaultValue: 1,
      bindable: true,
    },
    globalStyle: {
      type: "Object",
      options: {
        item: {
          fontSize: {
            type: "Length",
            label: { en: "Font size", fr: "Taille du texte" },
            options: {
              unitChoices: [
                { value: "px", label: "px", min: 10, max: 50 },
                { value: "em", label: "em", min: 1, max: 50 },
                { value: "rem", label: "rem", min: 1, max: 50 },
              ],
            },
            hidden: ({ isTooltip }) => !isTooltip,
          },
          fontFamily: {
            type: "FontFamily",
            label: { en: "Font family", fr: "Font" },
            hidden: ({ isTooltip }) => !isTooltip,
          },
          useActiveRangeBackground: {
            type: "OnOff",
            label: "Use an active range background color",
            default: false,
          },
          rangeBackgroundColor: {
            label: { en: "Range background", fr: "Range background" },
            type: "Color",
            bindable: true,
          },
          activeRangeBackgroundColor: {
            label: { en: "Active range background" },
            type: "Color",
            hidden: (content) => !content.globalStyle.useActiveRangeBackground,
            bindable: true,
          },
          selectorBorderColor: {
            label: { en: "Selector border", fr: "Selector border" },
            type: "Color",
            bindable: true,
          },
          selectorBackgroundColor: {
            label: { en: "Selector background", fr: "Selector background" },
            type: "Color",
            bindable: true,
          },
          selectorBorderWidth: {
            label: { en: "Selector border", fr: "Selector border" },
            type: "Number",
            bindable: true,
          },
          selectorHeight: {
            label: { en: "Selector Height", fr: "Selector Height" },
            type: "Number",
            bindable: true,
          },
          selectorWidth: {
            label: { en: "Selector Width", fr: "Selector Width" },
            type: "Number",
            bindable: true,
          },
          selectorBorderRadius: {
            label: {
              en: "Selector border radius",
              fr: "Selector border radius",
            },
            type: "Number",
            bindable: true,
          },
          trackHeight: {
            label: {
              en: "Track height",
              fr: "Track height",
            },
            type: "Number",
            bindable: true,
          },
          selectorShadow: {
            label: { en: "Selector box shadow", fr: "Selector box shadow" },
            type: "Text",
            bindable: true,
          },
          tooltipBackground: {
            label: { en: "Tooltip background", fr: "Tooltip background" },
            type: "Color",
            hidden: ({ isTooltip }) => !isTooltip,
          },
          tooltipTextColor: {
            label: { en: "Tooltip text", fr: "Tooltip texte" },
            type: "Color",
            hidden: ({ isTooltip }) => !isTooltip,
          },
        },
      },
      defaultValue: {
        fontSize: "15px",
        fontFamily: "",
        activeRangeBackgroundColor: null,
        rangeBackgroundColor: "transparent",
        selectorBorderColor: "#1565C0",
        selectorBackgroundColor: "rgb(9, 154, 242)",
        tooltipBackground: "rgb(9, 154, 242)",
        tooltipTextColor: "#FFFFFF",
        selectorBorderWidth: 2,
        selectorHeight: 18,
        selectorWidth: 18,
        selectorBorderRadius: 4,
        selectorShadow: "",
      },
    },
    isTooltip: {
      label: { en: "Tooltip", fr: "Tooltip" },
      type: "OnOff",
      defaultValue: true,
    },
  },
};
