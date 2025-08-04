import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MaterialIcon from "../../components/MaterialIcon.vue";
import { mdiHeart } from "@mdi/js";

describe("MaterialIcon", () => {
  it("renderiza correctamente con path requerido", () => {
    const wrapper = mount(MaterialIcon, {
      props: {
        path: mdiHeart,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find("path").attributes("d")).toBe(mdiHeart);
  });

  it("aplica el tamaño por defecto", () => {
    const wrapper = mount(MaterialIcon, {
      props: {
        path: mdiHeart,
      },
    });

    const svg = wrapper.find("svg");
    expect(svg.attributes("width")).toBe("24");
    expect(svg.attributes("height")).toBe("24");
  });

  it("aplica tamaño personalizado", () => {
    const customSize = "32";
    const wrapper = mount(MaterialIcon, {
      props: {
        path: mdiHeart,
        size: customSize,
      },
    });

    const svg = wrapper.find("svg");
    expect(svg.attributes("width")).toBe(customSize);
    expect(svg.attributes("height")).toBe(customSize);
  });

  it("aplica color personalizado", () => {
    const customColor = "#ff0000";
    const wrapper = mount(MaterialIcon, {
      props: {
        path: mdiHeart,
        color: customColor,
      },
    });

    const path = wrapper.find("path");
    expect(path.attributes("fill")).toBe(customColor);
  });

  it("aplica clase CSS personalizada", () => {
    const customClass = "mi-clase-personalizada";
    const wrapper = mount(MaterialIcon, {
      props: {
        path: mdiHeart,
      },
      attrs: {
        class: customClass,
      },
    });

    expect(wrapper.classes()).toContain(customClass);
  });
});
