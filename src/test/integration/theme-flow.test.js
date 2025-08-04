import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../../App.vue";
import ThemePanel from "../../components/ThemePanel.vue";
import MainLayout from "../../components/MainLayout.vue";
import MaterialIcon from "../../components/MaterialIcon.vue";

vi.mock("@vueuse/core", () => ({
  useLocalStorage: vi.fn(() => ({
    value: {
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      headerBackground: "#f8fafc",
      headerTextColor: "#1f2937",
      contentTitleColor: "#3b82f6",
      contentTextColor: "#4b5563",
      footerBackground: "#1f2937",
      footerTextColor: "#f9fafb",
      logoUrl: "/images/logo.gif",
    },
  })),
}));

vi.mock("vue-toastification", () => ({
  useToast: vi.fn(() => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  })),
}));

describe("Flujo de Personalización de Temas (Integration)", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        components: {
          ThemePanel,
          MainLayout,
          MaterialIcon,
        },
      },
    });
  });

  it("permite cambiar colores del tema y aplicarlos", async () => {
    const themePanel = wrapper.findComponent(ThemePanel);
    expect(themePanel.exists()).toBe(true);

    const backgroundColorInput = themePanel.find('input[type="color"]');
    const newColor = "#ff0000";

    await backgroundColorInput.setValue(newColor);
    await backgroundColorInput.trigger("change");

    expect(themePanel.emitted("update-theme")).toBeTruthy();
  });

  it("sincroniza cambios entre ThemePanel y MainLayout", async () => {
    const newTheme = {
      backgroundColor: "#ff0000",
      textColor: "#ffffff",
      headerBackground: "#333333",
      headerTextColor: "#ffffff",
      contentTitleColor: "#ff6600",
      contentTextColor: "#cccccc",
      footerBackground: "#000000",
      footerTextColor: "#ffffff",
      logoUrl: "/images/logo.gif",
    };

    const themePanel = wrapper.findComponent(ThemePanel);
    const mainLayout = wrapper.findComponent(MainLayout);

    await themePanel.vm.$emit("update-theme", newTheme);
    await wrapper.vm.$nextTick();

    expect(mainLayout.props("theme")).toEqual(
      expect.objectContaining(newTheme)
    );
  });

  it("maneja el flujo completo de personalización de logo", async () => {
    const themePanel = wrapper.findComponent(ThemePanel);

    const mockFile = new File(["fake-image-content"], "test-logo.jpg", {
      type: "image/jpeg",
    });

    const fileInput = themePanel.find('input[type="file"]');
    expect(fileInput.exists()).toBe(true);

    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: "data:image/jpeg;base64,fake-base64-data",
    };

    global.FileReader = vi.fn(() => mockFileReader);

    Object.defineProperty(fileInput.element, "files", {
      value: [mockFile],
    });

    await fileInput.trigger("change");

    if (mockFileReader.onload) {
      mockFileReader.onload();
    }

    expect(themePanel.emitted("update-theme")).toBeTruthy();
  });

  it("valida la persistencia del tema", () => {
    const component = wrapper.vm;

    const testTheme = {
      backgroundColor: "#123456",
      textColor: "#abcdef",
    };

    component.updateTheme(testTheme);

    expect(component.theme.backgroundColor).toBe("#123456");
    expect(component.theme.textColor).toBe("#abcdef");
  });

  it("maneja notificaciones de éxito y error", async () => {
    const component = wrapper.vm;

    component.showNotification(
      "Éxito",
      "Tema guardado correctamente",
      "success"
    );
    component.showNotification("Error", "Error al guardar tema", "error");

    expect(component.toast.success).toHaveBeenCalled();
    expect(component.toast.error).toHaveBeenCalled();
  });

  it("resetea el tema a valores por defecto", async () => {
    const themePanel = wrapper.findComponent(ThemePanel);

    const resetButton = themePanel.find("button:last-child");
    if (resetButton.exists()) {
      await resetButton.trigger("click");
      expect(themePanel.emitted("update-theme")).toBeTruthy();
    }
  });
});
