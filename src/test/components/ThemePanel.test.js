import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ThemePanel from "../../components/ThemePanel.vue";
import MaterialIcon from "../../components/MaterialIcon.vue";

vi.mock("@mdi/js", () => ({
  mdiPalette: "mdiPalette-mock",
  mdiContentSaveAll: "mdiContentSaveAll-mock",
  mdiRestore: "mdiRestore-mock",
  mdiImageEdit: "mdiImageEdit-mock",
  mdiImagePlus: "mdiImagePlus-mock",
}));

describe("ThemePanel", () => {
  let wrapper;
  const defaultTheme = {
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    headerBackground: "#f8fafc",
    headerTextColor: "#1f2937",
    contentTitleColor: "#3b82f6",
    contentTextColor: "#4b5563",
    footerBackground: "#1f2937",
    footerTextColor: "#f9fafb",
    logoUrl: "/images/logo.gif",
  };

  beforeEach(() => {
    wrapper = mount(ThemePanel, {
      props: {
        theme: defaultTheme,
      },
      global: {
        components: {
          MaterialIcon,
        },
      },
    });
  });

  it("renderiza correctamente", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".theme-panel").exists()).toBe(true);
  });

  it("muestra los inputs de color correctamente", () => {
    const colorInputs = wrapper.findAll('input[type="color"]');
    expect(colorInputs.length).toBeGreaterThan(0);
  });

  it("muestra el valor inicial del tema", () => {
    const backgroundColorInput = wrapper.find('input[type="color"]');
    expect(backgroundColorInput.element.value).toBe(
      defaultTheme.backgroundColor
    );
  });

  it("emite evento update-theme cuando cambia un color", async () => {
    const colorInput = wrapper.find('input[type="color"]');
    const newColor = "#ff0000";

    await colorInput.setValue(newColor);
    await colorInput.trigger("change");

    expect(wrapper.emitted("update-theme")).toBeTruthy();
  });

  it("muestra los botones de acción", () => {
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("emite evento save-theme cuando se hace clic en guardar", async () => {
    const saveButton = wrapper.find("button:nth-child(1)");
    await saveButton.trigger("click");

    expect(wrapper.emitted("save-theme")).toBeTruthy();
  });

  it("muestra la sección de logo personalizado", () => {
    expect(wrapper.text()).toContain("Logo Personalizado");
  });

  it("applica clase compact cuando compact es true", () => {
    const compactWrapper = mount(ThemePanel, {
      props: {
        theme: defaultTheme,
        compact: true,
      },
      global: {
        components: {
          MaterialIcon,
        },
      },
    });

    expect(compactWrapper.find(".theme-panel-compact").exists()).toBe(true);
  });

  it("valida los colores hexadecimales", () => {
    const component = wrapper.vm;
    expect(component.validateColor("backgroundColor")).toBe(true);
  });

  it("maneja el cambio de logo URL", async () => {
    const logoUrlInput = wrapper.find('input[accept="image/*"]');
    expect(logoUrlInput.exists()).toBe(true);
  });
});
