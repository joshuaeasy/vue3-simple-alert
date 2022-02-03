import {App} from "vue";
import Swal, {
  SweetAlertOptions,
  SweetAlertResult,
  SweetAlertType
} from "sweetalert2";

export class VueSimpleAlert {
  public static globalOptions: SweetAlertOptions;

  public static alert(
    message?: string,
    title?: string,
    type?: SweetAlertType,
    options?: SweetAlertOptions
  ): Promise<boolean> {
    return new Promise(resolve => {
      const mixedOptions: SweetAlertOptions = {
        ...VueSimpleAlert.globalOptions,
        ...options
      };
      mixedOptions.title = title || mixedOptions.title;
      mixedOptions.html = message || mixedOptions.html;
      mixedOptions.type = type || mixedOptions.type;

      Swal.fire(mixedOptions)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(true);
        });
    });
  }

  public static confirm(
    message?: string,
    title?: string,
    type?: SweetAlertType,
    options?: SweetAlertOptions
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const mixedOptions: SweetAlertOptions = {
        ...VueSimpleAlert.globalOptions,
        ...options
      };
      mixedOptions.title = title || mixedOptions.title;
      mixedOptions.html = message || mixedOptions.html;
      mixedOptions.type = type || mixedOptions.type;
      mixedOptions.showCancelButton = true;

      Swal.fire(mixedOptions)
        .then((r: SweetAlertResult) => {
          if (r.value === true) {
            // Closed by OK button
            resolve(true);
          } else reject();
        })
        .catch(() => reject());
    });
  }

  public static prompt(
    message: string,
    defaultText?: string,
    title?: string,
    type?: SweetAlertType,
    options?: SweetAlertOptions
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const mixedOptions: SweetAlertOptions = {
        ...VueSimpleAlert.globalOptions,
        ...options
      };
      mixedOptions.title = title || mixedOptions.title;
      mixedOptions.inputValue = defaultText;
      mixedOptions.html = message || mixedOptions.html;
      mixedOptions.type = type || mixedOptions.type;
      mixedOptions.showCancelButton = true;
      mixedOptions.input = mixedOptions.input || "text";

      Swal.fire(mixedOptions)
        .then(r => {
          if (r.value) {
            // Closed by OK button
            resolve(r.value);
          } else reject();
        })
        .catch(() => {
          return reject();
        });
    });
  }

  public static fire(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }

  static install(app: App, options: SweetAlertOptions): void {
    VueSimpleAlert.globalOptions = options;
      // Global properties
      app.config.globalProperties.alert = VueSimpleAlert.alert;
      app.config.globalProperties.confirm = VueSimpleAlert.confirm;
      app.config.globalProperties.prompt = VueSimpleAlert.prompt;
      app.config.globalProperties.fire = VueSimpleAlert.fire;
      // Instance properties
      if (!app.config.globalProperties.hasOwnProperty("$alert")) {
          app.config.globalProperties.$alert = VueSimpleAlert.alert;
      }
      if (!app.config.globalProperties.hasOwnProperty("$confirm")) {
          app.config.globalProperties.$confirm = VueSimpleAlert.confirm;
      }
      if (!app.config.globalProperties.hasOwnProperty("$prompt")) {
          app.config.globalProperties.$prompt = VueSimpleAlert.prompt;
      }
      if (!app.config.globalProperties.hasOwnProperty("$fire")) {
          app.config.globalProperties.$fire = VueSimpleAlert.fire;
      }
  }
}

declare module "vue/types/vue" {
  interface App {
    $alert: typeof VueSimpleAlert.alert;
    $confirm: typeof VueSimpleAlert.confirm;
    $prompt: typeof VueSimpleAlert.prompt;
    $fire: typeof VueSimpleAlert.fire;
  }

  interface VueConstructor {
    alert: typeof VueSimpleAlert.alert;
    confirm: typeof VueSimpleAlert.confirm;
    prompt: typeof VueSimpleAlert.prompt;
    fire: typeof VueSimpleAlert.fire;
  }
}

export default VueSimpleAlert;
