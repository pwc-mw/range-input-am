<template>
  <div class="ww-form-input-range" :style="tooltipStyle">
    <div
      v-if="content.isTooltip"
      id="tooltiptext"
      class="ww-form-input-range__tooltip"
    >
      {{ value }}
    </div>
    <input
      ref="input"
      :value="value"
      :class="{ editing: isEditing }"
      type="range"
      :name="wwElementState.name"
      :required="content.required"
      :style="style"
      :min="content.min"
      :max="content.max"
      :step="content.step"
      @input="handleManualInput($event)"
    />
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
    uid: { type: String, required: true },
    wwElementState: { type: Object, required: true },
  },
  emits: ["trigger-event"],
  setup(props) {
    const { value: variableValue, setValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: "value",
        type: "number",
        defaultValue: computed(() => {
          let value = parseFloat(props.content.value);
          value = isNaN(value) ? 0 : value;
          return value;
        }),
      });
    return { variableValue, setValue };
  },
  computed: {
    isEditing() {
      /* wwEditor:start */
      return (
        this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    },
    value() {
      return this.variableValue;
    },
    style() {
      const ratio =
        ((this.value - this.content.min) /
          (this.content.max - this.content.min)) *
        100;
      if (!this.content || !this.content.globalStyle)
        return {
          "--ratio": `${ratio}%`,
        };
      return {
        "--range-border": this.content.globalStyle.rangeBorderColor,
        "--range-background": this.content.globalStyle.rangeBackgroundColor,
        "--active-range-background": this.content.globalStyle
          .useActiveRangeBackground
          ? this.content.globalStyle.activeRangeBackgroundColor
          : this.content.globalStyle.rangeBackgroundColor,
        "--selector-border": this.content.globalStyle.selectorBorderColor,
        "--selector-border-width":
          this.content.globalStyle.selectorBorderWidth + "px",
        "--selector-height": this.content.globalStyle.selectorHeight + "px",
        "--selector-width": this.content.globalStyle.selectorWidth + "px",
        "--selector-border-radius":
          this.content.globalStyle.selectorBorderRadius + "px",
        "--selector-shadow": this.content.globalStyle.selectorShadow,
        "--track-height": this.content.globalStyle.trackHeight,
        "--selector-background":
          this.content.globalStyle.selectorBackgroundColor,
        "--ratio": `${ratio}%`,
      };
    },
    tooltipStyle() {
      return {
        fontSize: this.content.globalStyle.fontSize,
        fontFamily: this.content.globalStyle.fontFamily,
        "--tooltip-position":
          "calc(" + (this.value * 100) / this.content.max + "% - 20px)",
        "--tooltip-background": this.content.globalStyle.tooltipBackground,
        "--tooltip-text-color": this.content.globalStyle.tooltipTextColor,
      };
    },
  },
  watch: {
    "content.value"(newValue) {
      newValue = parseFloat(newValue);
      if (isNaN(newValue)) newValue = 0;
      if (newValue === this.value) return;
      this.setValue(newValue);
      this.$emit("trigger-event", {
        name: "initValueChange",
        event: { value: newValue },
      });
    },
  },
  methods: {
    handleManualInput(event) {
      const value = parseFloat(event.target.value);
      if (isNaN(value)) value = 0;
      if (value === this.value) return;
      this.setValue(value);
      this.$emit("trigger-event", {
        name: "change",
        event: { domEvent: event, value },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ww-form-input-range {
  position: relative;
  width: 100%;
  outline: none;
  font-family: inherit;
  border: inherit;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }
  /* wwEditor:start */
  .editing {
    pointer-events: none;
  }
  /* wwEditor:end */
  input[type="range"] {
    -webkit-appearance: none;
    background-color: transparent;
    margin: 10px 0;
    width: 100%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: linear-gradient(
        var(--active-range-background),
        var(--active-range-background)
      )
      0 / var(--ratio) 100% no-repeat var(--range-background);
    border-radius: 1px;
    border: 0px solid #000000;
  }
  input[type="range"]::-webkit-slider-thumb {
    margin-top: calc((var(--track-height) - var(--selector-height)) / 2);
    box-shadow: var(--selector-shadow);
    border: var(--selector-border-width) solid var(--selector-border);
    height: var(--selector-height);
    width: var(--selector-width);
    border-radius: var(--selector-border-radius);
    background: var(--selector-background);
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type="range"]::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: var(--range-background);
    border-radius: 1px;
    border: 0px solid #000000;
  }
  input[type="range"]::-moz-range-thumb {
    margin-top: calc((var(--track-height) - var(--selector-height)) / 2);
    box-shadow: var(--selector-shadow);
    border: var(--selector-border-width) solid var(--range-background);
    height: var(--selector-height);
    width: var(--selector-width);
    border-radius: var(--selector-border-radius);
    background: var(--range-background);
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    background: transparent;

    border-color: transparent;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background: linear-gradient(
        var(--active-range-background),
        var(--active-range-background)
      )
      0 / var(--ratio) 100% no-repeat var(--range-background);

    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type="range"]::-ms-fill-upper {
    background: linear-gradient(
        var(--active-range-background),
        var(--active-range-background)
      )
      0 / var(--ratio) 100% no-repeat var(--range-background);
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type="range"]::-ms-thumb {
    margin-top: calc((var(--track-height) - var(--selector-height)) / 2);
    box-shadow: var(--selector-shadow);
    border: var(--selector-border-width) solid var(--range-border);
    height: var(--selector-height);
    width: var(--selector-width);
    border-radius: var(--selector-border-radius);
    background: var(--range-background);
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: linear-gradient(
        var(--active-range-background),
        var(--active-range-background)
      )
      0 / var(--ratio) 100% no-repeat var(--range-background);
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: linear-gradient(
        var(--active-range-background),
        var(--active-range-background)
      )
      0 / var(--ratio) 100% no-repeat var(--range-background);
  }
  &__tooltip {
    visibility: visible;
    background-color: var(--tooltip-background);
    color: var(--tooltip-text-color);
    text-align: center;
    padding: var(--track-height) 15px;
    border-radius: 6px;
    position: absolute;
    z-index: 20;
    top: 0px;
    left: var(--tooltip-position);
    transform: translateY(-120%) translateX(-5%);
  }
  &:hover &__tooltiptext {
    visibility: visible;
  }
}
</style>
